import { Link, useParams } from 'react-router-dom'

// Dynamic route: /products/:id (see Resource 3: Dynamic Routes with URL Parameters).
export default function ProductDetailPage({ products, addToCart }) {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <section className="page">
        <h1 className="page-title">Product not found</h1>
        <p>This product does not exist or was removed.</p>
        <Link to="/products" className="btn">Back to products</Link>
      </section>
    )
  }

  return (
    <section className="page detail">
      <div className="detail-tile" aria-hidden="true">{product.emoji}</div>
      <div className="detail-info">
        <p className="product-category">{product.category}</p>
        <h1 className="page-title">{product.name}</h1>
        <p className="detail-price">${product.price.toFixed(2)}</p>
        <p className="detail-text">{product.description}</p>
        <div className="detail-actions">
          <button type="button" className="btn btn-large" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <Link to="/products">Back to products</Link>
        </div>
      </div>
    </section>
  )
}
