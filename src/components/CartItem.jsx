export default function CartItem({ item, removeFromCart }) {
  return (
    <li className="cart-item">
      <span className="cart-item-emoji" aria-hidden="true">{item.emoji}</span>
      <div className="cart-item-info">
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-qty">Quantity: {item.quantity}</p>
      </div>
      <p className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</p>
      <button
        type="button"
        className="btn btn-quiet"
        onClick={() => removeFromCart(item.id)}
        aria-label={`Remove ${item.name} from cart`}
      >
        Remove
      </button>
    </li>
  )
}
