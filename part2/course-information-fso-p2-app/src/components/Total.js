import React from 'react'

const Total = ({ parts }) => {
  return (
    <p>
      <strong>
        Number of exercises {parts.reduce((acc, currV) => currV.exercises + acc, 0)}
      </strong>
    </p>
  )
}

export default Total
