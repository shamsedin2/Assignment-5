# ComponentCorner

A multi-page React storefront built with React Router. The shopping cart is saved in localStorage, so it stays the same when you switch pages or close the tab.

## Features
- React Router with four pages: Home (`/`), Products (`/products`), Product Details (`/products/:id`), and Cart (`/cart`)
- Header navigation built with `Link` / `NavLink` (the current page is highlighted)
- Cart icon links to the cart page and shows a live item count
- Cart state lives in `App.jsx` and is saved to and loaded from `localStorage`
- Add to Cart, Remove, Clear Cart, and cart total (`reduce`)
- "Page not found" message for unknown URLs
- Yellow and green theme

## Run it
```bash
npm install
npm run dev
```
Then open http://localhost:5173

## Project structure
```
src/
  App.jsx                  router setup + cart state + localStorage
  App.css                  all styles (AI-assisted CSS is commented)
  main.jsx                 entry point
  components/
    Header.jsx             logo, nav links, cart badge
    Hero.jsx               welcome banner
    ProductCard.jsx        one product + Add to Cart
    CartItem.jsx           one cart row + Remove
    Footer.jsx             contact info and links
    ScrollToTop.jsx        scrolls to the top when the page changes
  pages/
    HomePage.jsx           hero + "Why Shop with Us?"
    ProductsPage.jsx       product grid
    ProductDetailsPage.jsx one product from the URL id
    CartPage.jsx           cart items and total
```

## AI attribution
The styling in `App.css` (yellow and green theme) and the page layouts were created with help from Claude (Anthropic). Rules written by the AI are marked "AI-generated" in the CSS comments.
