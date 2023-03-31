import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="nav-bar">
    <Link to="/" className="link-style">
      <h1 className="logo">
        COVID19<span className="span-logo">INDIA</span>
      </h1>
    </Link>
    <ul className="nav-links-container">
      <Link to="/" className="link-style">
        <li>
          <button type="button">Home</button>
        </li>
      </Link>
      <Link to="/about" className="link-style">
        <li>
          <button type="button">About</button>
        </li>
      </Link>
    </ul>
  </nav>
)

export default Header
