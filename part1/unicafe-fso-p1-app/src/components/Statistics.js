import React from 'react'

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default Statistics
