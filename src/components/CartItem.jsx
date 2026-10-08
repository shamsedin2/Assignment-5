// Displays one item in the cart with its name, price, and a remove button.
function CartItem({ item, onRemove }) {
  return (
    <li className="cart-item">
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <p>${item.price.toFixed(2)}</p>
      </div>
      {/* Tell App which specific cart entry to remove */}
      <button className="remove-button" onClick={() => onRemove(item.cartId)}>
        Remove
      </button>
    </li>
  );
}

export default CartItem;
