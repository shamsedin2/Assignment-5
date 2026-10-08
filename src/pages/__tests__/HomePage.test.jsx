import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../HomePage'

// HomePage uses <Link>, so it must be rendered inside a router.
function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  )
}

describe('HomePage', () => {
  test('renders without crashing', () => {
    renderHomePage()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  test('displays the hero headline and intro text', () => {
    renderHomePage()
    expect(screen.getByText('Good tools for long study nights.')).toBeInTheDocument()
    expect(screen.getByText(/picked for students/i)).toBeInTheDocument()
  })

  test('displays the "Why Shop with Us?" section with its reasons', () => {
    renderHomePage()
    expect(screen.getByRole('heading', { name: 'Why Shop with Us?' })).toBeInTheDocument()
    expect(screen.getByText('Student prices')).toBeInTheDocument()
    expect(screen.getByText('Tested on campus')).toBeInTheDocument()
    expect(screen.getByText('Free returns')).toBeInTheDocument()
  })

  test('has a link to the products page', () => {
    renderHomePage()
    expect(screen.getByRole('link', { name: 'Browse products' })).toHaveAttribute('href', '/products')
  })
})
