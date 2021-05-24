import PropTypes from 'prop-types'
import Button from './Button'
import {useLocation} from 'react-router-dom'

const Header = (props) => {
    const location = useLocation();
    return (
        <header className='header'>
            <h1>{props.title}</h1>
            {location.pathname === '/' ? <Button color={props.showAddTask ? 'red' : 'green'} text={props.showAddTask ? 'Close' : 'Show'} onClick={props.onClickAdd}/> : ''}
        </header>
    )
}

Header.defaultProps = {
    title : "Task Tracker",
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header
