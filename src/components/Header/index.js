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
        <li>
          <Link to="/" className="link-style">
            <button type="button">Home</button>
          </Link>
        </li>
        <li>
          <Link to="/about" className="link-style">
            <button type="button">About</button>
          </Link>
        </li>
      </ul>
    </div>
    <div>
      <ul className="nav-links-sm-container">
        <li>
          <Link to="/" className="link-style">
            <button type="button">Home</button>
          </Link>
        </li>
        <li>
          <Link to="/about" className="link-style">
            <button type="button">About</button>
          </Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default Header
