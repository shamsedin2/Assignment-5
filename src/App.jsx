import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'

export const CART_STORAGE_KEY = 'cart'

export const products = [
  { id: 1, name: 'Dot-Grid Notebook', category: 'Paper', price: 12.5, emoji: '', description: 'A5, 160 pages of 100 gsm paper that handles fountain pens without bleeding through.' },
  { id: 2, name: 'Gel Pen Set (6)', category: 'Writing', price: 8.99, emoji: '', description: 'Quick-drying 0.5 mm gel pens in six colors for color-coded notes.' },
  { id: 3, name: 'Clip-On Desk Lamp', category: 'Desk', price: 34.0, emoji: '', description: 'Warm LED light with three brightness levels and a flexible neck.' },
  { id: 4, name: 'Highlighters (5)', category: 'Writing', price: 6.49, emoji: '', description: 'Soft pastel highlighters that will not smear printed ink.' },
  { id: 5, name: 'Laptop Stand', category: 'Desk', price: 29.99, emoji: '', description: 'Folding aluminum stand that raises your screen to eye level.' },
  { id: 6, name: 'Sticky Notes', category: 'Paper', price: 4.99, emoji: '', description: 'Four pads of 100 notes each, sized for flashcards and reminders.' },
  { id: 7, name: 'Commuter Backpack', category: 'Carry', price: 49.0, emoji: '', description: 'Padded 15-inch laptop sleeve, water-resistant fabric, and a hidden pocket.' },
  { id: 8, name: 'Study Headphones', category: 'Audio', price: 59.0, emoji: '', description: 'Over-ear headphones with 30-hour battery life for library sessions.' },
]

// Reads the saved cart once, when the app starts.
// If nothing is saved or the data is broken, start with an empty cart.
function loadCart() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>© 2026 Margin Supply. Built with React and React Router.</p>
    </footer>
  )
}

export default function App() {
  // Passing loadCart (not loadCart()) makes React call it only on the first render.
  const [cart, setCart] = useState(loadCart)

  // Save the cart every time it changes, so it survives page navigation and closed tabs.
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <BrowserRouter>
      <div className="app">
        <Header cartCount={cartCount} />
        <main className="site-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage products={products} addToCart={addToCart} />} />
            <Route path="/products/:id" element={<ProductDetailPage products={products} addToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage products={cart} removeFromCart={removeFromCart} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
