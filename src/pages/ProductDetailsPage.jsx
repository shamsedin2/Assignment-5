// ProductDetailsPage: one product, picked using the :id in the URL.
// Example: /products/3 shows the product with id 3.
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetailsPage({ products, addToCart }) {
  const { id } = useParams(); // id from the URL is a string
  const product = products.find((p) => p.id === Number(id));
  const [added, setAdded] = useState(false);

  // If someone types an id that doesn't exist
  if (!product) {
    return (
      <section className="page not-found">
        <h1>Product not found</h1>
        <Link to="/products" className="primary-button">Back to Products</Link>
      </section>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
  };

  return (
    <section className="page product-details">
      <Link to="/products" className="back-link">← Back to Products</Link>
      <div className="details-layout">
        <img src={product.image} alt={product.name} />
        <div className="details-info">
          <h1>{product.name}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="details-description">{product.description}</p>
          <button className="primary-button" onClick={handleAdd}>Add to Cart</button>
          {added && (
            <p className="added-message">
              Added to your cart! <Link to="/cart">View cart</Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetailsPage;
