import { useState } from 'react'

import Feedback from './components/Feedback'
import Statistics from './components/Statistics'

import './App.css'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGoodHandler = () => {
    setGood(good + 1)
  }

  const clickNeutralHandler = () => {
    setNeutral(neutral + 1)
  }

  const clickBadHandler = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Feedback
        handleGoodClick={clickGoodHandler}
        handleNeutralClick={clickNeutralHandler}
        handleBadClick={clickBadHandler}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
