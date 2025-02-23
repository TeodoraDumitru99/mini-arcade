import React, { useState, useEffect } from "react";
import "./memory.css";
import CardFace1 from "../assets/card2.png";
import CardFace2 from "../assets/card3.png";
import CardFace3 from "../assets/card4.png";

const cardData = [
  { id: 0, image: CardFace1, pairId: 1 },
  { id: 1, image: CardFace2, pairId: 2 },
  { id: 2, image: CardFace3, pairId: 3 },
  { id: 3, image: CardFace2, pairId: 2 },
  { id: 4, image: CardFace1, pairId: 1 },
  { id: 5, image: CardFace3, pairId: 3 },
];

const Memory = () => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]); // Currently flipped cards
  const [matched, setMatched] = useState([]); // Cards that are matched
  const [lockBoard, setLockBoard] = useState(false);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffled = [...cardData].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelected([]);
    setMatched([]);
    setMoves(0);
    setWon(false);
    setLockBoard(false);
  };

  const handleCardClick = (id) => {
    if (lockBoard) return;
    if (selected.includes(id) || matched.includes(id)) return; // Ignore already selected/matched cards

    if (selected.length < 2) {
      setSelected((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    if (selected.length === 2) {
      setLockBoard(true);
      const timer = setTimeout(() => {
        const [firstId, secondId] = selected;
        const firstCard = cards.find((card) => card.id === firstId);
        const secondCard = cards.find((card) => card.id === secondId);
        setMoves((prev) => prev + 1);

        if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
          setMatched((prev) => [...prev, firstId, secondId]);
        }

        setSelected([]);
        setLockBoard(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [selected, cards]);

  useEffect(() => {
    if (cards.length > 0 && matched.length === cards.length) {
      setWon(true);
    }
  }, [matched, cards]);

  return (
    <section className="memory">
      <div className="wrapper">
        <div className="memory_content">
          <h2 className="memory_header">Memory Card Game</h2>
          <div className="memory_cards">
            {cards.map((card) => {
              const isFlipped =
                selected.includes(card.id) || matched.includes(card.id);
              return (
                <div
                  key={card.id}
                  className={`mcard ${isFlipped ? "flipped" : ""} ${
                    matched.includes(card.id) ? "matched" : ""
                  }`}
                  onClick={() => handleCardClick(card.id)}
                >
                  <div className="mcard_front">
                    <img className="mcard_face" src={card.image} alt="card" />
                  </div>
                  <div className="mcard_back"></div>
                </div>
              );
            })}
          </div>
          <div className="memory_text">
            <p className="memory_moves">Moves: {moves}</p>
            {won && <p className="memory_status">Won in {moves} moves!</p>}
            <button className="memory_button" onClick={startNewGame}>
              New Game
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Memory;
