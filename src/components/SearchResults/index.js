import {Link} from 'react-router-dom'

import {BiChevronRightSquare} from 'react-icons/bi'

import './index.css'

const SearchResults = props => {
  const {state} = props
  const stateCode = state.state_code
  const stateName = state.state_name

  return (
    <Link to={`/state/${stateCode}`} className="link-bar">
      <li className="search-bar">
        <p>{stateName}</p>
        <div className="icon">
          <p>{stateCode}</p>
          <BiChevronRightSquare size="20px" fill="#facc15" />
        </div>
      </li>
    </Link>
  )
}

export default SearchResults
