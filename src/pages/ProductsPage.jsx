// ProductsPage: shows every product in a grid
import ProductCard from "../components/ProductCard";

function ProductsPage({ products, addToCart }) {
  return (
    <section className="page products">
      <h1>Our Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;
