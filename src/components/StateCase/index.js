import './index.css'

const StateCase = props => {
  const {stateDetails, changeCaseType} = props
  const {confirmed, deceased, recovered, active} = stateDetails

  const changeToConfirmed = () => {
    changeCaseType('confirmed')
  }

  const changeToDeceased = () => {
    changeCaseType('deceased')
  }

  const changeToRecovered = () => {
    changeCaseType('recovered')
  }

  const changeToActive = () => {
    changeCaseType('active')
  }

  return (
    <div className="stats-container">
      <button
        testid="stateSpecificConfirmedCasesContainer"
        type="button"
        onClick={changeToConfirmed}
        className={`confirmed-card btn ${'stat-card'}`}
      >
        <p>Confirmed</p>
        <img
          src="https://res.cloudinary.com/djy2od68c/image/upload/v1672747947/check-mark_1_zgzdjy.png"
          alt="state specific confirmed cases pic"
          className="pic-size"
        />
        <p>{confirmed}</p>
      </button>
      <button
        testid="stateSpecificActiveCasesContainer"
        type="button"
        onClick={changeToActive}
        className={`active-card btn ${'stat-card'}`}
      >
        <p>Active</p>
        <img
          src="https://res.cloudinary.com/djy2od68c/image/upload/v1672748000/protection_1_kwud79.png"
          alt="state specific active cases pic"
          className="pic-size"
        />
        <p>{active}</p>
      </button>
      <button
        testid="stateSpecificRecoveredCasesContainer"
        type="button"
        onClick={changeToRecovered}
        className={`recovered-card btn ${'stat-card'}`}
      >
        <p>Recovered</p>
        <img
          src="https://res.cloudinary.com/djy2od68c/image/upload/v1672748049/recovered_1_1_fhgv0r.png"
          alt="state specific recovered cases pic"
          className="pic-size"
        />
        <p>{recovered}</p>
      </button>
      <button
        testid="stateSpecificDeceasedCasesContainer"
        type="button"
        onClick={changeToDeceased}
        className={`deceased-card btn ${'stat-card'}`}
      >
        <p>Deceased</p>
        <img
          src="https://res.cloudinary.com/djy2od68c/image/upload/v1672748066/breathing_1_ya1lcf.png"
          alt="state specific deceased cases pic"
          className="pic-size"
        />
        <p>{deceased}</p>
      </button>
    </div>
  )
}

export default StateCase
