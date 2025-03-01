import "../rock_paper_scissor/rock_paper_scissor.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import RockImg from "../assets/rock.png";
import PaperImg from "../assets/paper.png";
import ScissorsImg from "../assets/scissors.png";
import ArrowImg from "../assets/arrow.png";

const choices = [
  { name: "Rock", imgsrc: RockImg },
  { name: "Paper", imgsrc: PaperImg },
  { name: "Scissors", imgsrc: ScissorsImg },
];

const RockPaperScissors = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [winner, setWinner] = useState(null);

  const playGame = (choice) => {
    setPlayerChoice(choice);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);

    const result = getWinner(choice.name, randomChoice.name);

    if (result === "player") {
      setPlayerScore((prev) => {
        const newScore = prev + 1;
        if (newScore === 3) setWinner("You");
        return newScore;
      });
    } else if (result === "computer") {
      setComputerScore((prev) => {
        const newScore = prev + 1;
        if (newScore === 3) setWinner("Computer");
        return newScore;
      });
    }
  };

  const getWinner = (player, computer) => {
    if (player === computer) return "Tie!";
    if (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Paper" && computer === "Rock") ||
      (player === "Scissors" && computer === "Paper")
    ) {
      return "player";
    }
    return "computer";
  };

  const restartGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setWinner(null);
  };

  return (
    <section className="rps section">
      <div className="wrapper game_wrapper">
        <Link to="/games" className="arrow_back_button">
          <img src={ArrowImg} alt="Back" className="back_arrow" />
        </Link>
        <div className="game_content rps_content">
          <h2 className="header rps_header">Rock Paper Scissors</h2>
          <div className="subtitle rps_subtitle">
            <div className="rps_status">
              <p>You/Computer:</p>
              <div>
                {playerScore}/{computerScore}
              </div>
            </div>
            {winner && (
              <div className="rps_status">
                <strong>{winner} </strong>
                <p> won!</p>
              </div>
            )}
          </div>
          <div className="rps_choices">
            {choices.map((choice) => (
              <div
                key={choice.name}
                className={`rps_choice ${winner ? "rps_won" : ""}`}
                onClick={() => !winner && playGame(choice)}
              >
                <img
                  src={choice.imgsrc}
                  alt={choice.name}
                  className="rps_choice_img"
                />
                <span
                  className="rps_choice_button"
                  onClick={() => !winner && playGame(choice)}
                  disabled={!!winner}
                >
                  {choice.name}
                </span>
              </div>
            ))}
          </div>
          {playerChoice && (
            <div className="rps_results">
              <p className="subtitle">Your Choice: {playerChoice.name}</p>
              <p className="subtitle">
                Computer's Choice: {computerChoice.name}
              </p>
            </div>
          )}
          {winner && (
            <button className="reset_button" onClick={restartGame}>
              Reset
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default RockPaperScissors;
