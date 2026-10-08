import { Link } from 'react-router-dom'

export default function Header({ cartCount = 0 }) {
  return (
    <header className="site-header">
      <Link to="/" className="brand">Margin Supply</Link>
      <nav className="site-nav" aria-label="Main">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart" className="cart-link" aria-label={`Cart, ${cartCount} items`}>
          <span aria-hidden="true">🛒</span>
          <span className="cart-count" data-testid="cart-count">{cartCount}</span>
        </Link>
      </nav>
    </header>
  )
}
