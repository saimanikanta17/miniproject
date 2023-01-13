import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Faqs = props => {
  const {faq} = props
  const {question, answer} = faq
  return (
    <li>
      <p className="question-style">{question}</p>
      <p className="answer-style">{answer}</p>
    </li>
  )
}

class About extends Component {
  state = {faqsList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getFaqs()
  }

  getFaqs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(url)
    const data = await response.json()
    const faqsList = data.faq
    this.setState({faqsList, apiStatus: apiStatusConstants.success})
  }

  renderLoader = () => (
    <div testid="aboutRouteLoader" className="loader-container">
      <Loader type="TailSpin" color="#007Bff" height="50" width="50" />
    </div>
  )

  renderFaqs = () => {
    const {faqsList} = this.state
    return (
      <>
        <h1>About</h1>
        <p>COVID-19 vaccines be ready for distribution</p>
        <ul testid="faqsUnorderedList" className="faq-card">
          {faqsList.map(faq => (
            <Faqs key={faq.qno} faq={faq} />
          ))}
        </ul>
        <Footer />
      </>
    )
  }

  renderAboutView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderFaqs()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="about-container">{this.renderAboutView()}</div>
      </div>
    )
  }
}

export default About