const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config() // Allows use to look for variables inside of the .env file

const Note = require('./models/note')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then((savedNote) => {
    response.json(savedNote)
  })
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)

  response.status(204).end()
})

app.get('/api/notes/:id', (req, res) => {
  // const id = Number(request.params.id)
  // const note = notes.find((note) => note.id === id)

  // if (note) {
  //   response.json(note)
  // } else {
  //   response.status(404).end()
  // }

  Note.findById(req.params.id).then((note) => {
    res.json(note)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
