// CartPage: the items in the cart, the total, and remove buttons
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function CartPage({ cart, removeFromCart, clearCart }) {
  // Add up every price in the cart, starting from 0
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="page cart">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/products" className="primary-button">Start Shopping</Link>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <CartItem key={item.cartId} item={item} onRemove={removeFromCart} />
            ))}
          </ul>
          <div className="cart-summary">
            <button className="clear-button" onClick={clearCart}>Clear Cart</button>
            <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
          </div>
        </>
      )}
    </section>
  );
}

export default CartPage;
