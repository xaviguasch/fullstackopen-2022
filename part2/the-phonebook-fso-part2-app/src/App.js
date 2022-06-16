import { useState } from 'react'

import './App.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const checkRepeats = (formName) =>
    persons.some((p) => p.name.toLowerCase() === formName.toLowerCase())

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  const addNameHandler = (event) => {
    event.preventDefault()

    if (checkRepeats(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([
        ...persons,
        { name: newName, number: newNumber, id: persons.length + 1 },
      ])
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input value={filterText} onChange={handleFilterChange} />
      </div>
      <form onSubmit={addNameHandler}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((p) => p.name.toLowerCase().includes(filterText.toLowerCase()))
          .map((p) => (
            <li key={p.name}>
              {p.name} {p.number}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default App
