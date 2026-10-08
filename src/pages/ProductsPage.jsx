import ProductCard from '../components/ProductCard'

export default function ProductsPage({ products, addToCart }) {
  return (
    <section className="page">
      <h1 className="page-title">All products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </section>
  )
}
