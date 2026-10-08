import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartItem from '../CartItem'

const item = {
  id: 2,
  name: 'Gel Pen Set (6)',
  price: 8.99,
  emoji: '🖊️',
  quantity: 3,
}

function renderItem(removeFromCart = vi.fn()) {
  // CartItem renders an <li>, so wrap it in a <ul> for valid HTML.
  render(
    <ul>
      <CartItem item={item} removeFromCart={removeFromCart} />
    </ul>
  )
  return removeFromCart
}

describe('CartItem', () => {
  test('renders without crashing', () => {
    renderItem()
    expect(screen.getByRole('listitem')).toBeInTheDocument()
  })

  test('displays the item name and quantity', () => {
    renderItem()
    expect(screen.getByText('Gel Pen Set (6)')).toBeInTheDocument()
    expect(screen.getByText('Quantity: 3')).toBeInTheDocument()
  })

  test('displays the line total (price x quantity)', () => {
    renderItem()
    expect(screen.getByText('$26.97')).toBeInTheDocument()
  })

  test('clicking Remove calls removeFromCart with the item id', async () => {
    const user = userEvent.setup()
    const removeFromCart = renderItem()

    await user.click(screen.getByRole('button', { name: /remove/i }))

    expect(removeFromCart).toHaveBeenCalledTimes(1)
    expect(removeFromCart).toHaveBeenCalledWith(2)
  })
})
