const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the phonebook!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  const person = persons.find((person) => person.id === id)

  if (person) {
    res.json(person)
  } else {
    const statusMessage = "We haven't found any person with that ID"
    res.status(404).end(statusMessage)
  }
})

app.post('/api/persons', (req, res) => {
  const person = { id: Math.floor(Math.random() * 1000000), ...req.body }

  persons.push(person)

  res.json(person)
})

app.get('/info', (req, res) => {
  const numOfEntries = persons.length
  const currentDate = new Date()

  res.send(`
    <div>
      <p>Phonebook has info for ${numOfEntries} people</p>
      <p>${currentDate}</p>
    <div>
  `)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  persons = persons.filter((person) => person.id !== id)

  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
