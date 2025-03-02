import { Link } from "react-router-dom";
import "./hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="wrapper display_wrapper">
        <div className="display_power_light"></div>
        <div className="display hero_display">
          <div className="hero_content">
            <h1 className="hero_header">MINI ARCADE</h1>
            <h2 className="hero_subtitle">
              Revisit your favourite classic games
            </h2>
            <Link to="/games" className="hero_game_button">
              PLAY
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
