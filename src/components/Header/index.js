import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="nav-bar">
    <div>
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
    </div>
    <div>
      <ul className="nav-links-sm-container">
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
    </div>
  </nav>
)

export default Header
