import { useState } from 'react'

import './App.css'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ]

  const [selected, setSelected] = useState(0)
  const [votesArr, setVotesArr] = useState([...Array(anecdotes.length).fill(0)])

  const handleRandomClick = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length)

    setSelected(randomNum)
  }

  const handleVoteClick = () => {
    const newVotesArr = [...votesArr]

    newVotesArr[selected] += 1

    setVotesArr(newVotesArr)
  }

  const maxVotes = Math.max(...votesArr)

  const indexOfMaxVotedAnecdote = votesArr.indexOf(maxVotes)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p> {anecdotes[selected]}</p>
      <p>has {votesArr[selected]} votes</p>
      <button onClick={handleVoteClick}>Vote</button>
      <button onClick={handleRandomClick}>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[indexOfMaxVotedAnecdote]}</p>
      <p>has {votesArr[indexOfMaxVotedAnecdote]}</p>
    </div>
  )
}

export default App
