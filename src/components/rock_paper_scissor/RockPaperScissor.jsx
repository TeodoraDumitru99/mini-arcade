import "../rock_paper_scissor/rock_paper_scissor.css";
import { useState } from "react";
import RockImg from "../assets/rock.png";
import PaperImg from "../assets/paper.png";
import ScissorsImg from "../assets/scissors.png";

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
    <section className="rps">
      <div className="wrapper">
        <div className="rps_content">
          <h2 className="rps_header">Rock Paper Scissors</h2>
          <div className="rps_status">
            <div className="rps_scoreboard">
              <div>
                You: <strong>{playerScore}</strong>
              </div>
              <div>
                Computer: <strong>{computerScore}</strong>
              </div>
            </div>

            {winner && (
              <div className="rps_winner">
                <span>Winner:</span>
                <strong>{winner}</strong>
              </div>
            )}
          </div>
          <div className="rps_choices">
            {choices.map((choice) => (
              <div key={choice.name} className="rps_choice">
                <img
                  src={choice.imgsrc}
                  alt={choice.name}
                  className="rps_choice_img"
                  onClick={() => playGame(choice)}
                />
                <button
                  className="rps_choice_button"
                  onClick={() => !winner && playGame(choice)}
                  disabled={!!winner}
                >
                  {choice.name}
                </button>
              </div>
            ))}
          </div>
          {playerChoice && (
            <div className="rps_results">
              <p className="rps_result">
                Your Choice: <strong>{playerChoice.name}</strong>
              </p>
              <p className="rps_result">
                Computer's Choice: <strong>{computerChoice.name}</strong>
              </p>
            </div>
          )}
          {winner && (
            <button className="rps_restart" onClick={restartGame}>
              Restart
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default RockPaperScissors;
