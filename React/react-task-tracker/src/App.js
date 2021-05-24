import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer);
    }
    getTasks();
  }, [])

  const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE'
      });
      
      setTasks(tasks.filter((task) => task.id !== id))
  }

  const addTask = async (task) => {
      const resp = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      });

      const data = await resp.json();
      setTasks([...tasks, data]);
      
      // const id = Math.floor(Math.random()*1000) +1;
      // const newTask = {id, ...task};
      // setTasks([...tasks, newTask]);
  }

  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const resp = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      });

    const data = await resp.json();
    setTasks(tasks.map((task)=> task.id !== id ?  task : data));
  }

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  }

  return (
    <Router>
      <div className="container">
        <Header onClickAdd={toggleAddTask} showAddTask={showAddTask}/>
        <Route path='/' exact render ={ (props) => (
          <>
            {showAddTask ? <AddTask onAdd={addTask}/> : ''}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : "No tasks bro woohoo"}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
