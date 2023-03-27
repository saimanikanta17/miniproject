import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import {LineChart, XAxis, YAxis, Tooltip, Legend, Line} from 'recharts'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import Footer from '../Footer'

import StateCase from '../StateCase'

import TopDistricts from '../TopDistricts'

import DateWiseBarGraph from '../DateWiseBarGraph'

import statesList from '../data'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SpecificState extends Component {
  state = {
    stateDetails: {},
    districtsDetails: [],
    caseType: 'confirmed',
    apiStatus: apiStatusConstants.initial,
    timeLineDetails: [],
    timeLineApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getStateDetails()
  }

  getFormattedData = (eachDistrict, districts) => {
    const districtName = eachDistrict
    let {confirmed, deceased, recovered} = districts[eachDistrict].total

    if (confirmed === undefined) {
      confirmed = 0
    }
    if (deceased === undefined) {
      deceased = 0
    }
    if (recovered === undefined) {
      recovered = 0
    }

    const active = confirmed - (recovered + deceased)

    return {
      districtName,
      confirmed,
      deceased,
      recovered,
      active,
    }
  }

  getTimeLineDetails = (lastTen, dates) => {
    const resultList = []
    lastTen.forEach(keyDate => {
      if (dates[keyDate]) {
        const {total, delta} = dates[keyDate]

        const confirmedCases = total.confirmed ? total.confirmed : 0
        const deceasedCases = total.deceased ? total.deceased : 0
        const recoveredCases = total.recovered ? total.recovered : 0

        const confirmed = delta.confirmed ? delta.confirmed : 0
        const deceased = delta.deceased ? delta.deceased : 0
        const recovered = delta.recovered ? delta.recovered : 0
        const tested = delta.tested ? delta.tested : 0
        resultList.push({
          date: keyDate,
          confirmed,
          deceased,
          recovered,
          tested,
          active: confirmedCases - (deceasedCases + recoveredCases),
        })
      }
    })
    return resultList
  }

  getStateDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {caseType} = this.state
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    const fetchedData = await response.json()

    const codes = Object.keys(fetchedData)
    if (codes.includes(stateCode)) {
      const stateKeys = Object.keys(fetchedData[stateCode])
      if (stateKeys.includes('districts')) {
        const {districts} = fetchedData[stateCode]
        const districtsNames = Object.keys(districts)
        const districtsDetails = districtsNames.map(eachDistrict =>
          this.getFormattedData(eachDistrict, districts),
        )
        districtsDetails.sort((a, b) => b[caseType] - a[caseType])

        const lastUpdated = fetchedData[stateCode].meta.last_updated

        const stateName = statesList.find(
          state => state.state_code === stateCode,
        ).state_name
        const stateStats = fetchedData[stateCode].total
        const {confirmed, deceased, recovered, tested} = stateStats
        const stateDetails = {
          stateCode,
          stateName,
          confirmed,
          deceased,
          recovered,
          active: confirmed - (recovered + deceased),
          tested,
          lastUpdated,
        }
        this.setState({
          stateDetails,
          districtsDetails,
          apiStatus: apiStatusConstants.success,
        })
        this.getTimelineData()
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getTimelineData = async () => {
    this.setState({
      timeLineApiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const url = 'https://apis.ccbp.in/covid19-timelines-data'
    const responseTime = await fetch(url)
    const fetchedDataTime = await responseTime.json()

    const {dates} = fetchedDataTime[stateCode]
    const datesArray = Object.keys(dates)
    datesArray.reverse()
    const lastTen = datesArray.slice(0, 10)
    lastTen.reverse()

    const timeLineDetails = this.getTimeLineDetails(lastTen, dates)

    this.setState({
      timeLineDetails,
      timeLineApiStatus: apiStatusConstants.success,
    })
  }

  changeCaseType = caseType => {
    const {districtsDetails} = this.state
    districtsDetails.sort((a, b) => b[caseType] - a[caseType])
    this.setState({caseType, districtsDetails})
  }

  renderLoader = () => (
    <div testid="stateDetailsLoader" className="loader-container">
      <Loader type="TailSpin" color="#007Bff" height="50" width="50" />
    </div>
  )

  showTimeLineLoader = () => (
    <div testid="timelinesDataLoader" className="loader-container">
      <Loader type="TailSpin" color="#007Bff" height="50" width="50" />
    </div>
  )

  renderLineChart = eachCase => {
    const {timeLineDetails} = this.state
    let color = '#8884d8'
    if (eachCase === 'deceased') {
      color = '#6c757d'
    } else if (eachCase === 'recovered') {
      color = '#28a745'
    } else if (eachCase === 'active') {
      color = '#007bff'
    } else if (eachCase === 'confirmed') {
      color = '#ff073a'
    }
    return (
      <div>
        <LineChart
          width={730}
          height={250}
          data={timeLineDetails}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={eachCase} stroke={color} />
        </LineChart>
      </div>
    )
  }

  renderTimeLineDetailsView = () => {
    const caseList = ['confirmed', 'active', 'recovered', 'deceased', 'tested']
    return (
      <>
        <h1 className="spread-trends">Daily Spread Trends</h1>
        <div testid="lineChartsContainer">
          {caseList.map(t => (
            <div key={t}>{this.renderLineChart(t)}</div>
          ))}
        </div>
      </>
    )
  }

  renderStateDetailsView = () => {
    const {
      stateDetails,
      districtsDetails,
      caseType,
      timeLineDetails,
    } = this.state
    const {tested, stateName, lastUpdated} = stateDetails

    return (
      <>
        <div className="state-details">
          <div>
            <div className="state-name">
              <h1>{stateName}</h1>
            </div>
            <p>Last update on {lastUpdated}.</p>
          </div>
          <div className="tested-card">
            <p>Tested</p>
            <p>{tested}</p>
          </div>
        </div>
        <StateCase
          stateDetails={stateDetails}
          changeCaseType={this.changeCaseType}
        />
        <h1 className={`district-name ${caseType}`}>Top Districts</h1>
        <ul testid="topDistrictsUnorderedList" className="district-cases">
          {districtsDetails.map(eachDistrict => (
            <TopDistricts
              eachDistrict={eachDistrict}
              key={eachDistrict.districtName}
              caseType={caseType}
            />
          ))}
        </ul>
        <DateWiseBarGraph
          timeLineDetails={timeLineDetails}
          caseType={caseType}
        />
      </>
    )
  }

  renderStateDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderStateDetailsView()
      case apiStatusConstants.failure:
        return <Redirect to="/bad-path" />
      default:
        return null
    }
  }

  renderTimeLineDetails = () => {
    const {timeLineApiStatus} = this.state
    switch (timeLineApiStatus) {
      case apiStatusConstants.inProgress:
        return this.showTimeLineLoader()
      case apiStatusConstants.success:
        return this.renderTimeLineDetailsView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <Header />
        <div className="specific-state-container">
          {this.renderStateDetails()}
          {this.renderTimeLineDetails()}
          <Footer />
        </div>
      </div>
    )
  }
}

export default SpecificState
