import {VscGithubAlt} from 'react-icons/vsc'

import {FaTwitter} from 'react-icons/fa'

import {FiInstagram} from 'react-icons/fi'

import './index.css'

const Footer = () => (
  <div className="footer-card">
    <h1 className="footer-logo">
      COVID19<span className="span-logo">INDIA</span>
    </h1>
    <p>we stand with everyone fighting on the front lines</p>
    <div className="social-icons">
      <VscGithubAlt size="45px" />
      <FiInstagram size="45px" />
      <FaTwitter size="45px" />
    </div>
  </div>
)

export default Footer
