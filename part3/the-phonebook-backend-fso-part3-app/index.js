const express = require('express')
const app = express()

const cors = require('cors')

require('dotenv').config() // Allows use to look for variables inside of the .env file

const morgan = require('morgan')

const Contact = require('./models/contact')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

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
  Contact.find({}).then((contacts) => {
    res.json(contacts)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Contact.findById(req.params.id).then((contact) => {
    res.json(contact)
  })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  console.log('body: ', body.name)

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact.save().then((savedContact) => {
    res.json(savedContact)
  })
})

app.get('/info', (req, res) => {
  const numOfEntries = Contact.count({}).then((count) => {
    res.json(count)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  Contact.findByIdAndRemove(req.params.id).then((result) => {
    res.status(204).end()
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
