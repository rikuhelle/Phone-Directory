
const Person = require('./models/person')

if (process.argv.length === 4) {
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
        })
    

person
  .save()
  .then(response => {
    console.log('adding person ' + process.argv[2] + ' number ' + process.argv[3] + ' to the directory')
    mongoose.connection.close()
  })
}
else{
    Person
  .find({})
  .then(result => {
    console.log('puhelinluettelo:')
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
}