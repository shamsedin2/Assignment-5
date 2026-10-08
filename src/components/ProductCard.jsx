import { Link } from 'react-router-dom'

export default function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <div className="product-tile" aria-hidden="true">{product.emoji}</div>
      <p className="product-category">{product.category}</p>
      <h3 className="product-name">
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button type="button" className="btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </article>
  )
}
