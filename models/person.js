const mongoose = require('mongoose')

const url = 'mongodb+srv://Riku:Web-Ohjelmointi@phonebook-alhjp.mongodb.net/phonebook'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person