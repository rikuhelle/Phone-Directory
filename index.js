
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())

let notes = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    }
    
  ]
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(notes)
  })
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
  
    if ( note ) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    return Math.floor(Math.random() * 1000)
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    const arr = notes.map(note =>note.name)

    if(arr.includes(body.name)){
      return response.status(400).json({error: 'name already exists'})
    }
  
    if (body.name === undefined || body.number === undefined) {
      return response.status(400).json({error: 'name or number missing'})
    }
  
    const note = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })
  
  const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})