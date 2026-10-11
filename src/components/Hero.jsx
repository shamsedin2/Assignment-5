// Hero banner at the top of the home page
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to ComponentCorner</h1>
        <p>Discover amazing products built with React components</p>
        <Link to="/products" className="hero-button">Shop Now</Link>
      </div>
    </section>
  );
}

export default Hero;
