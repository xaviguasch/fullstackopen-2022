const express = require('express')
const app = express()

const cors = require('cors')

const morgan = require('morgan')

app.use(express.json())
app.use(cors())

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

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ')
  })
)

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
  const newPerson = { id: Math.floor(Math.random() * 1000000), ...req.body }

  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({ error: 'content missing' })
  }

  const isPersonRepeated = persons.some(
    (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
  )

  if (isPersonRepeated) {
    return res.status(400).json({ error: 'person already exists in the phonebook' })
  }

  persons.push(newPerson)

  res.json(newPerson)
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
