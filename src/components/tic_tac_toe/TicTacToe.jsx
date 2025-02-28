import "./tic_tac_toe.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowImg from "../assets/arrow.png";

const TicTacToe = () => {
  const Square = ({ squareValue, onSquareClick, isWinning }) => {
    return (
      <button
        className={`square_button ${isWinning ? "winning_square" : ""}`}
        onClick={onSquareClick}
      >
        {squareValue}
      </button>
    );
  };

  const [xIsNext, setXIsNext] = useState(true); //game starts with 'X'
  const [squares, setSquares] = useState(Array(9).fill(null));

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares).winner) {
      return;
    } //if the square is marked //return the function early before it tries to update

    const nextSquares = squares.slice(); //creates a copy of the 'squares' array
    if (xIsNext) {
      nextSquares[i] = "X";
    } //function updates i index value with 'X' or 'O'
    else {
      nextSquares[i] = "O";
    } //updates the component's state with the new array
    //each time a player moves 'xIsNext' is flipped to determine which player goes next
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const { winner, winningSquares } = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a Draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <section className="tic_tac_toe">
      <div className="wrapper tic_wrapper">
        <Link to="/games" className="arrow_back_button">
          <img src={ArrowImg} alt="Back" className="back_arrow" />
        </Link>
        <div className="tic_content">
          <h1 className="header">Tic Tac Toe</h1>
          <div className="subtitle">{status}</div>
          <div className="tic_board">
            {squares.map((square, index) => (
              <Square
                key={index}
                squareValue={square}
                onSquareClick={() => handleClick(index)}
                isWinning={winningSquares.includes(index)}
              />
            ))}
          </div>
          {(winner || isDraw) && (
            <button className="reset_button" onClick={resetGame}>
              Reset
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSquares: [a, b, c] };
    }
  }
  return { winner: null, winningSquares: [] };
}

export default TicTacToe;

//Clicking on the upper left square runs the function that the button received as its onClick prop from the Square. The Square component received that function as its onSquareClick prop from the Board. The Board component defined that function directly in the JSX. It calls handleClick with an argument of 0.
//handleClick uses the argument (0) to update the first element of the squares array from null to X.
//The squares state of the Board component was updated, so the Board and all of its children re-render. This causes the value prop of the Square component with index 0 to change from null to X.
//to show when someone has won and the game has finished we use a function called calculateWinner that takes an array of 9 squares, checks for the winner and returns 'X','O',or 'null'
