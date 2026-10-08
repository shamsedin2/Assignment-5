// App.jsx holds the router setup and the cart state.
// The cart lives here (not in a page) so it stays the same on every route.
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import "./App.css";

// Placeholder image in the store colors with the product name on it
const img = (text) =>
  `https://placehold.co/600x400/2e7d32/ffd93b?text=${encodeURIComponent(text)}`;

// Product data (outside the component so it isn't recreated on every render)
const products = [
  { id: 1, name: "Wireless Headphones", price: 99.99, image: img("Wireless Headphones"),
    description: "Premium noise-cancelling headphones with 30-hour battery life" },
  { id: 2, name: "Smart Watch", price: 249.99, image: img("Smart Watch"),
    description: "Fitness tracker with heart rate monitor and GPS" },
  { id: 3, name: "Bluetooth Speaker", price: 79.99, image: img("Bluetooth Speaker"),
    description: "Portable waterproof speaker with 360-degree sound" },
  { id: 4, name: "Laptop Stand", price: 49.99, image: img("Laptop Stand"),
    description: "Ergonomic aluminum stand for laptops and tablets" },
  { id: 5, name: "Webcam", price: 129.99, image: img("Webcam"),
    description: "4K webcam with auto-focus and noise reduction" },
  { id: 6, name: "Mechanical Keyboard", price: 159.99, image: img("Mechanical Keyboard"),
    description: "RGB backlit keyboard with custom switches" },
];

// The key we use to save the cart in localStorage
const CART_KEY = "componentcorner-cart";

function App() {
  // Load the cart from localStorage the first time App renders.
  // Passing a function to useState means this only runs once.
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return []; // if the saved data is broken, start with an empty cart
    }
  });

  // Save the cart to localStorage every time it changes
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // Each cart entry gets its own cartId so removing one copy
  // of a product doesn't remove all of them
  const addToCart = (product) => {
    const cartItem = { ...product, cartId: crypto.randomUUID() };
    setCart((prevCart) => [...prevCart, cartItem]);
  };

  // Keep every item EXCEPT the one that was clicked
  const removeFromCart = (cartId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => setCart([]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <Header cartCount={cart.length} />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/products"
              element={<ProductsPage products={products} addToCart={addToCart} />}
            />
            <Route
              path="/products/:id"
              element={<ProductDetailsPage products={products} addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={
                <CartPage cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />
              }
            />
            {/* Any other URL shows a simple "not found" message */}
            <Route
              path="*"
              element={
                <section className="page not-found">
                  <h1>Page not found</h1>
                  <p>That page doesn't exist. Try the menu above.</p>
                </section>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
