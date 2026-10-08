import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'

// `products` here is the list of items in the cart, passed in from App.jsx.
export default function CartPage({ products, removeFromCart }) {
  if (products.length === 0) {
    return (
      <section className="page">
        <h1 className="page-title">Your cart</h1>
        <p className="empty">Your cart is empty. Add something from the products page to see it here.</p>
        <Link to="/products" className="btn">Browse products</Link>
      </section>
    )
  }

  const total = products.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <section className="page">
      <h1 className="page-title">Your cart</h1>
      <ul className="cart-list">
        {products.map((item) => (
          <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
        ))}
      </ul>
      <p className="cart-total">
        Total: <strong>${total.toFixed(2)}</strong>
      </p>
    </section>
  )
}
