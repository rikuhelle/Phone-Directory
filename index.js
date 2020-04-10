
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
const Person = require('./models/person')


const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

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
  
  app.get('/api/persons', (request, response) => {
    Person
      .find({},{__v: 0})
      .then(persons => {
        response.json(persons.map(formatPerson))
      })
  })
  app.get('/api/persons/:id', (request, response) => {
    Person
      .findById(request.params.id)
      .then(person => {
        if(person){
        response.json(formatPerson(person))
        }else{
          response.status(404).end()
        }
      }).catch(error => {
        console.log(error)
        response.status(400).send({error:'malformatted id'})
      })
  })
  app.delete('/api/persons/:id', (request, response) => {
    Person
      .findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => {
        response.status(400).send({ error: 'malformatted id' })
      })
  })

  const generateId = () => {
    return Math.floor(Math.random() * 1000)
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    const person = new Person({
      name: body.name,
      number: body.number,
      id: generateId()
    })
  
    person
    .save()
    .then(savedNote => {
      response.json(formatPerson(savedNote))
    })
  })
  
  const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})