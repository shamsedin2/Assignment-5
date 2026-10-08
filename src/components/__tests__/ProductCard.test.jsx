import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from '../ProductCard'

const product = {
  id: 1,
  name: 'Dot-Grid Notebook',
  category: 'Paper',
  price: 12.5,
  emoji: '📓',
}

function renderCard(addToCart = vi.fn()) {
  render(
    <MemoryRouter>
      <ProductCard product={product} addToCart={addToCart} />
    </MemoryRouter>
  )
  return addToCart
}

describe('ProductCard rendering', () => {
  test('renders without crashing', () => {
    renderCard()
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  test('displays the product name and price from props', () => {
    renderCard()
    expect(screen.getByText('Dot-Grid Notebook')).toBeInTheDocument()
    expect(screen.getByText('$12.50')).toBeInTheDocument()
  })

  test('contains an "Add to Cart" button', () => {
    renderCard()
    expect(screen.getByRole('button', { name: 'Add to Cart' })).toBeInTheDocument()
  })
})

describe('ProductCard interactions', () => {
  test('clicking "Add to Cart" calls addToCart with the product', async () => {
    const user = userEvent.setup()
    const addToCart = renderCard()

    await user.click(screen.getByRole('button', { name: 'Add to Cart' }))

    expect(addToCart).toHaveBeenCalledTimes(1)
    expect(addToCart).toHaveBeenCalledWith(product)
  })
})
