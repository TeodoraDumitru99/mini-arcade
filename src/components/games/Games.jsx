import { Link } from "react-router-dom";
import "./games.css";
import TicImg from "../assets/tictactoe.png";
import MemoryImg from "../assets/memory.png";
import RockImg from "../assets/rockpaperscissors.png";

const Games = () => {
  const gameLinks = [
    { key: 0, href: "/tictactoe", text: "Tic Tac Toe", imgsrc: TicImg },
    { key: 1, href: "/cardmemory", text: "Memory Card", imgsrc: MemoryImg },
    {
      key: 2,
      href: "/rockpaperscissors",
      text: "Rock Paper Scissors",
      imgsrc: RockImg,
    },
  ];

  return (
    <section className="games">
      <div className="wrapper">
        <div className="display games_display">
          <div className="display_power_light games_light"></div>
          <div className="games_content">
            <h2 className="games_header">Games</h2>
            <div className="games_games">
              <Link to="/" className="games_back_button">
                ◄ Back
              </Link>
              <ul className="games_list">
                {gameLinks.map((gameLink) => (
                  <div key={gameLink.key}>
                    <Link to={gameLink.href}>
                      <li className="games_game_group">
                        <img
                          src={gameLink.imgsrc}
                          alt={gameLink.text}
                          className="games_game_img"
                        />
                        <span className="games_name">{gameLink.text}</span>
                      </li>
                    </Link>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Games;
