// Header: logo, navigation links, and the cart icon with a live item count.
// NavLink is a React Router Link that also knows when its page is active.
import { Link, NavLink } from "react-router-dom";

function Header({ cartCount }) {
  return (
    <header className="header">
      <Link to="/" className="logo">ComponentCorner</Link>

      <nav className="nav">
        {/* "end" makes Home only active on "/" exactly */}
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </nav>

      {/* Clicking the cart icon takes you to the cart page */}
      <Link to="/cart" className="cart-container" aria-label={`Cart, ${cartCount} items`}>
        <span className="cart-icon" aria-hidden="true">🛒</span>
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </Link>
    </header>
  );
}

export default Header;
