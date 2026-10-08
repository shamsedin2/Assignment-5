// Footer with contact details and links to the main pages
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <h3>ComponentCorner</h3>
        <p>Email: hello@componentcorner.com</p>
        <p>Phone: (443) 123-4567</p>
        <p>Address: 123 React Street, Component City, RC 12345</p>
      </div>
      <nav className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </footer>
  );
}

export default Footer;
