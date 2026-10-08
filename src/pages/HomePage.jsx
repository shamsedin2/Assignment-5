// HomePage: the Hero banner plus a short "Why Shop with Us?" section
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

function HomePage() {
  const reasons = [
    { icon: "", title: "Fast, free shipping", text: "Free shipping on every order over $50, delivered in 2–4 days." },
    { icon: "", title: "1-year warranty", text: "Every product is covered, so you can shop with confidence." },
    { icon: "↩", title: "Easy returns", text: "Changed your mind? Send it back within 30 days." },
  ];

  return (
    <>
      <Hero />
      <section className="page why-us">
        <h2>Why Shop with Us?</h2>
        <p className="why-intro">
          ComponentCorner is a small tech shop for students and anyone who wants
          good gear without the high price. We pick every product ourselves.
        </p>
        <div className="why-grid">
          {reasons.map((reason) => (
            <div key={reason.title} className="why-item">
              <span className="why-icon" aria-hidden="true">{reason.icon}</span>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </div>
          ))}
        </div>
        <Link to="/products" className="primary-button">Browse Products</Link>
      </section>
    </>
  );
}

export default HomePage;
