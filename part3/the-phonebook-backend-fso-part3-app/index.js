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

app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res) => {
  const body = req.body

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

app.put('/api/persons/:id', (req, res, next) => {
  const { number } = req.body

  Contact.findByIdAndUpdate(
    req.params.id,
    { number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedContact) => {
      res.json(updatedContact)
    })
    .catch((error) => next(error))
})

app.get('/info', (req, res) => {
  const numOfEntries = Contact.count({}).then((count) => {
    res.json(count)
  })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

// ADDED ERROR HANDLING MIDDLEWARE
const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
