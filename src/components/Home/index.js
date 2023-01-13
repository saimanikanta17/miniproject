import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import Footer from '../Footer'

import CountryStats from '../CountryStats'

import StateStats from '../StateStats'

import SearchResults from '../SearchResults'

import statesList from '../data'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    stateWiseData: [],
    apiStatus: apiStatusConstants.initial,
    searchState: '',
  }

  componentDidMount() {
    this.getStateWiseData()
  }

  getFormattedData = (element, data) => {
    const code = element.state_code
    return {
      stateCode: code,
      stateName: element.state_name,
      confirmedCases: data[code].total.confirmed,
      deceasedCases: data[code].total.deceased,
      recoveredCases: data[code].total.recovered,
      population: data[code].meta.population,
    }
  }

  getStateWiseData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    const fetchedData = await response.json()
    const stateWiseData = statesList.map(state =>
      this.getFormattedData(state, fetchedData),
    )

    stateWiseData.sort((a, b) => a.stateName - b.stateName)
    this.setState({
      apiStatus: apiStatusConstants.success,
      stateWiseData,
    })
  }

  sortingAsc = () => {
    const {stateWiseData} = this.state
    stateWiseData.sort((a, b) =>
      a.stateName.toLowerCase() < b.stateName.toLowerCase() ? -1 : 1,
    )
    this.setState({stateWiseData})
  }

  sortingDesc = () => {
    const {stateWiseData} = this.state
    stateWiseData.sort((a, b) =>
      a.stateName.toLowerCase() > b.stateName.toLowerCase() ? -1 : 1,
    )
    this.setState({stateWiseData})
  }

  changeSearch = event => {
    this.setState({searchState: event.target.value})
  }

  renderHomeRouteLoader = () => (
    <div testid="homeRouteLoader" className="loader-container">
      <Loader type="TailSpin" color="#007Bff" height="50" width="50" />
    </div>
  )

  renderStatsView = () => {
    const {stateWiseData, searchState} = this.state
    const showResults = searchState !== ''
    const searchResults = statesList.filter(eachSearch =>
      eachSearch.state_name.toLowerCase().includes(searchState.toLowerCase()),
    )

    // searchResultsUnorderedList

    return (
      <div className="home-card">
        <div className="search-card">
          <BsSearch size="20px" fill="#94a3b8" />
          <input
            type="search"
            placeholder="Enter the State"
            value={searchState}
            className="search-input"
            onChange={this.changeSearch}
          />
        </div>
        {showResults ? (
          <ul testid="searchResultsUnorderedList" className="search-list">
            {searchResults.map(state => (
              <SearchResults key={state.state_code} state={state} />
            ))}
          </ul>
        ) : (
          <>
            <CountryStats stateWiseData={stateWiseData} />
            <StateStats
              stateWiseData={stateWiseData}
              sortingAsc={this.sortingAsc}
              sortingDesc={this.sortingDesc}
            />
            <Footer />
          </>
        )}
      </div>
    )
  }

  renderStats = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderHomeRouteLoader()
      case apiStatusConstants.success:
        return this.renderStatsView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <Header />
        {this.renderStats()}
      </div>
    )
  }
}

export default Home
