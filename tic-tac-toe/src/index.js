import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {

	if(props.winner) {
		return (
	      <button 
	      	className="winner" 
	      	onClick={props.onClick}>
	      	{props.value}
	      </button>
	     );
	}
	else {
	    return (
	      <button 
	      	className="square" 
	      	onClick={props.onClick}>
	      	{props.value}
	      </button>
	     );
	}
}


class Board extends React.Component {

	renderSquare(i) {
		return ( 
			<Square 
				key = {i}
				value={this.props.squares[i]}
				winner={this.props.winners[i]}
				onClick={() => this.props.onClick(i)}/>
		);
	}

	createBoard = (rows, cols) => {
		let board = []

		for (let i = 0; i < rows; i++) {
			let children = []

			for(let j=0;j<cols;j++) {
				children.push(this.renderSquare(j+3*i));
			}
			board.push(<div key={i} className="board-row">{children}</div>);
		}
		return board;
	}

	render() {
		const rows = 3, cols = 3;
		return (
			<div>{this.createBoard(rows,cols)}</div>
		);
	}

}

class Game extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
				last: null,
			}],
			isWinner: false,
			winners: Array(9).fill(false),
			xIsNext: true,
			stepNumber: 0,
			ascending: false,
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber+1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		
		if(calculateWinner(squares) || squares[i])
			return;

		squares[i] = this.state.xIsNext? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares,
				last: i,
			}]),
			xIsNext: !this.state.xIsNext,
			stepNumber: history.length,
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step%2) === 0,
		});
	}

	arrayfy(step) {
		return "( " + Math.floor(step/3) + ", " + step%3 + ")";
	}

	toggleButton() {
		const ascending = !this.state.ascending;
		this.setState({
			ascending: ascending,
		});
	}

	createWinners(winnerList) {
		var winners = this.state.winners;
		for (var i =  0; i < winnerList.length; i++) {
			winners[winnerList[i]] = true;
		}
		this.setState({
			isWinner: true,
			winners: winners,
		});
	}

	removeWinners() {
		this.setState({
			isWinner: false,
			winners: Array(9).fill(false),
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);
		const moves = history.map((step, move)=>{
			const desc = move ? 
			'Go to move #' + move + " played position " + this.arrayfy(step.last) : 'Go to game start';
			if(move === this.state.stepNumber)
				return(
				<li key={move}>
					<button onClick ={() => this.jumpTo(move)}><b>{desc}</b></button>		
				</li>
				);	
			return(
				<li key={move}>
					<button onClick ={() => this.jumpTo(move)}>{desc}</button>		
				</li>
			);
		})
		
		let status;
		if(winner){
			status = 'Winner : ' + (!this.state.xIsNext? 'X':'O');
			if(this.state.isWinner === false){
				this.createWinners(winner);
			}
		} else {
			if(this.state.stepNumber === 9)
				status = 'Tie!';
			else
				status = 'Next : ' + (this.state.xIsNext? 'X':'O');
			if(this.state.isWinner === true)
				this.removeWinners();		
		}
		return(
			<div className="game">
				<div className="game-board">
					<Board 
						squares = {current.squares}
						winners = {this.state.winners}
						onClick = {(i) => this.handleClick(i)}
					/>
				</div>		
				<div className="game-info">
		          <div>{status}</div>
		          <ol>{this.state.ascending ? moves: moves.reverse()}</ol>
		        </div>
		        <div className="toggle">
		        	<button onClick={() => this.toggleButton()}>Toggle order</button>
		        </div>
			</div>
		)
	}
}

ReactDOM.render(
	<Game />,document.getElementById('root')
);


function calculateWinner(squares) {
	const lines = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6],
	];

	for(let i=0;i<lines.length; i++) {
		const [a,b,c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return [a,b,c];
    	}
	}
	return null;
}