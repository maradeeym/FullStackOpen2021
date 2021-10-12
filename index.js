require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

//app.use(morgan('tiny'))
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '));

app.use(express.json())
app.use(express.static('build'))
const cors = require('cors')
app.use(cors())




let persons = [
      {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
      },
      {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
      },
      {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
      },
      {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
      }
    ]

let time = new Date()

    app.get('/', (req, res) => {
        res.send('<h1>Hello World!</h1>')
      })
    /*
          app.listen(3001, () => {
            console.log('App listening port 3000 ......')
          })
    */
      app.get('/api/persons', (req, res) => {
        Person.find({}).then(persons => {
          res.json(persons)
        })
        console.log('persons get toimii')
      })  
      
      app.get('/api/persons/:id', (request, response) => {
        Person.findById(request.params.id).then(person => {
          response.json(person)
        })
      })
    
    app.delete('/api/persons/:id', (req, res) => {
        const id = Number(req.params.id)
        persons = persons.filter(person => person.id !== id)
        res.status(204).end()
      })

    app.get('/info', (req, res) => {
        res.send('<p>Phonebook has info for '+ persons.length + ' people </p> <p>'+time +'</p>')
      })

      const generateId = () => {
        const maxId = persons.length > 0
          ? Math.max(...persons.map(n => n.id))
          : 0
        return maxId + 1
      }
      
      app.post('/api/persons', (req, res) => {
        const body = req.body
        if (body.name === '' || body.number === '') {
          console.log('eka error toimii')
          return res.status(400).json({ error: 'content missing' })
        }
        
        const person = new Person({
          name: body.name,
          number: body.number,
        })

        console.log(person)

          person.save().then(addedPerson => {
            res.json(addedPerson)
          })
      })

      app.put('/api/persons:id', (req, res) => {
        console.log('requesti tety...')
        const id = Number(req.params.id)
        const person = persons.find(person => person.id === id)
        console.log('requesti tety...')
        persons = persons.concat(person)
        res.json(person)
        }
      )
      
    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })



