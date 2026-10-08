// ProductCard shows one product. The image and name link to the
// product's details page, and the button adds it to the cart.
import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  const { id, name, price, image, description } = product;

  return (
    <div className="product-card">
      <Link to={`/products/${id}`} className="product-link">
        <img src={image} alt={name} />
        <h3>{name}</h3>
      </Link>
      <p className="product-description">{description}</p>
      <p className="product-price">${price.toFixed(2)}</p>
      <button className="add-button" onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
