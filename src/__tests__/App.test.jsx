import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App, { CART_STORAGE_KEY } from '../App'

// A fake localStorage, so tests never touch real browser storage.
let store = {}
const localStorageMock = {
  getItem: vi.fn((key) => (key in store ? store[key] : null)),
  setItem: vi.fn((key, value) => { store[key] = String(value) }),
  removeItem: vi.fn((key) => { delete store[key] }),
  clear: vi.fn(() => { store = {} }),
}

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock, configurable: true })
})

beforeEach(() => {
  store = {}
  vi.clearAllMocks()
  window.history.pushState({}, '', '/') // App uses BrowserRouter, so start each test on the home page
})

// The most recent cart that App saved to localStorage.
function lastSavedCart() {
  const cartCalls = localStorageMock.setItem.mock.calls.filter(([key]) => key === CART_STORAGE_KEY)
  return JSON.parse(cartCalls.at(-1)[1])
}

describe('App', () => {
  test('renders the header, home page, and footer', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'Margin Supply' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Why Shop with Us?' })).toBeInTheDocument()
    expect(screen.getByText(/© 2026 Margin Supply/)).toBeInTheDocument()
  })

  test('loads cart data from localStorage on startup', () => {
    store[CART_STORAGE_KEY] = JSON.stringify([
      { id: 1, name: 'Dot-Grid Notebook', price: 12.5, emoji: '📓', quantity: 2 },
      { id: 4, name: 'Highlighters (5)', price: 6.49, emoji: '🖍️', quantity: 1 },
    ])

    render(<App />)

    expect(localStorageMock.getItem).toHaveBeenCalledWith(CART_STORAGE_KEY)
    expect(screen.getByTestId('cart-count')).toHaveTextContent('3')
  })

  test('starts with an empty cart when localStorage has nothing saved', () => {
    render(<App />)
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
  })

  test('starts with an empty cart when the saved data is not valid JSON', () => {
    store[CART_STORAGE_KEY] = 'not json'
    render(<App />)
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
  })

  test('useEffect saves the cart to localStorage after the first render', () => {
    render(<App />)
    expect(localStorageMock.setItem).toHaveBeenCalledWith(CART_STORAGE_KEY, '[]')
  })

  test('saves cart changes to localStorage when a product is added', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: 'Products' }))
    const notebookCard = screen.getByText('Dot-Grid Notebook').closest('article')
    await user.click(within(notebookCard).getByRole('button', { name: 'Add to Cart' }))

    expect(lastSavedCart()).toEqual([expect.objectContaining({ id: 1, quantity: 1 })])
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
  })

  test('adding the same product twice increases its quantity', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: 'Products' }))
    const notebookCard = screen.getByText('Dot-Grid Notebook').closest('article')
    const addButton = within(notebookCard).getByRole('button', { name: 'Add to Cart' })
    await user.click(addButton)
    await user.click(addButton)

    expect(lastSavedCart()).toEqual([expect.objectContaining({ id: 1, quantity: 2 })])
  })

  test('saves cart changes to localStorage when an item is removed', async () => {
    store[CART_STORAGE_KEY] = JSON.stringify([
      { id: 2, name: 'Gel Pen Set (6)', price: 8.99, emoji: '🖊️', quantity: 1 },
    ])
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: /cart, 1 items/i }))
    await user.click(screen.getByRole('button', { name: /remove gel pen set/i }))

    expect(lastSavedCart()).toEqual([])
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })
})
