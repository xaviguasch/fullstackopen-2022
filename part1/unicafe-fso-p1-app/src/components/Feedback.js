import React from 'react'

import Button from './Button'

const Feedback = ({ handleGoodClick, handleNeutralClick, handleBadClick }) => {
  return (
    <div>
      <h2>Feedback</h2>

      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
    </div>
  )
}

export default Feedback
