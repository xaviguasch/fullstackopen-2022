const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
let name
let number

if (process.argv.length >= 3) {
  name = process.argv[3]
  number = process.argv[4]
}

const url = `mongodb+srv://xaviguasch:${password}@cluster0.1017e2z.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    if (name && number) {
      const contact = new Contact({
        name,
        number,
      })

      return contact.save()
    } else {
      return Contact.find()
    }
  })
  .then((data) => {
    console.log('contact info saved!')

    if (name && number) {
      console.log(`Added ${data.name} ${data.number} to phonebook`)
    } else {
      console.log('phonebook:')
      data.forEach((contact) => {
        console.log(`${contact.name} ${contact.number}`)
      })
    }

    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
