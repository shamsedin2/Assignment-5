import { Link } from 'react-router-dom'

// Hero was moved here from App.jsx.
function Hero() {
  return (
    <section className="hero">
      <h1 className="hero-title">
        <span className="highlight">Good tools for long study nights.</span>
      </h1>
      <p className="hero-text">
        Notebooks, pens, lamps, and bags picked for students who actually use them.
      </p>
      <Link to="/products" className="btn btn-large">Browse products</Link>
    </section>
  )
}

const reasons = [
  { title: 'Student prices', text: 'Most items cost under $35, and every price includes tax.' },
  { title: 'Tested on campus', text: 'We only stock gear that survived a full semester of real use.' },
  { title: 'Free returns', text: 'Changed your mind? Send it back within 30 days at no cost.' },
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="why" aria-labelledby="why-title">
        <h2 id="why-title">Why Shop with Us?</h2>
        <div className="why-grid">
          {reasons.map((reason) => (
            <div key={reason.title} className="why-item">
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
