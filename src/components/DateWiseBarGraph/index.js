import {XAxis, Tooltip, Legend, BarChart, Bar} from 'recharts'

import './index.css'

const DateWiseBarGraph = props => {
  const {timeLineDetails, caseType} = props
  let color = '#ff073a'
  if (caseType === 'deceased') {
    color = '#6c757d'
  } else if (caseType === 'recovered') {
    color = '#28a745'
  } else if (caseType === 'active') {
    color = '#007bff'
  }

  return (
    <div>
      <BarChart width={800} height={300} data={timeLineDetails}>
        <XAxis dataKey="date" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={caseType}
          fill={color}
          className="bar"
          label={{position: 'top', color: 'white'}}
        />
      </BarChart>
    </div>
  )
}

export default DateWiseBarGraph
