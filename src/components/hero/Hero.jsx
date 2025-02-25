import "./hero.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import TicImg from "../assets/tictactoe.png";
import MemoryImg from "../assets/memory.png";
import RockImg from "../assets/rockpaperscissors.png";

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(true);

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
    <section className="hero">
      <div className="wrapper">
        <div className="hero_content">
          {modalOpen ? (
            <div className="hero_modal">
              <h1 className="hero_header">MINI ARCADE</h1>
              <h2 className="hero_sutitle">
                Revisit your favourite classic games
              </h2>
              <button
                className="hero_game_button"
                onClick={() => setModalOpen(false)}
              >
                Games
              </button>
            </div>
          ) : (
            <div className="hero_games">
              <span
                className="hero_back_button"
                onClick={() => setModalOpen(true)}
              >
                ◄ Back
              </span>
              <ul className="hero_list">
                {gameLinks.map((gameLink) => (
                  <div key={gameLink.key}>
                    <Link to={gameLink.href}>
                      <li className="hero_game_group">
                        <img
                          src={gameLink.imgsrc}
                          alt={gameLink.text}
                          className="hero_game_img"
                        />
                        <span>{gameLink.text}</span>
                      </li>
                    </Link>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
