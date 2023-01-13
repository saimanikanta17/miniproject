import './index.css'

const TopDistricts = props => {
  const {eachDistrict, caseType} = props
  const caseCount = eachDistrict[caseType]
  const {districtName} = eachDistrict

  return (
    <li className="case-count">
      <p className="count">{caseCount}</p>
      <p className="name">{districtName}</p>
    </li>
  )
}

export default TopDistricts
