require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

//app.use(morgan('tiny'))
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '));

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const { response } = require('express')


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

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
      })  
      
      app.get('/api/persons/:id', (request, response) => {
        Person.findById(request.params.id)
        .then(person => {
          if(person) {
          response.json(person)
          } else {
            response.status(404).end()
          }
        })
        .catch(error => {
          console.log(error)
          response.status(400).send({ error: 'malformatted id'})
        })
      })
    
    app.delete('/api/persons/:id', (req, res, next) => {
        Person.findByIdAndRemove(req.params.id)
        .then(result => {
        res.status(204).end()
      })
      .catch(error => next(error))
    })

    app.get('/info', (req, res) => {
      Person.find({}).then(persons => {
        res.send('<p>Phonebook has info for '+ persons.length + ' people </p> <p>'+time +'</p>')
      })
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

      app.put('/api/persons/:id', (request, response, next) => {
        const body = request.body
        
        const person = {
          name: body.name,
          number: body.number,
        }

        Person.findByIdAndUpdate(request.params.id, person, { new: true })
          .then(updatedPerson => {
            response.json(updatedPerson)
          })
          .catch(error => next(error))  
        })

      const unknownEndpoint = (request, response) => {
        response.status(404).send({ error: 'unknown endpoint' })
      }

      app.use(unknownEndpoint)


      const errorHandler = (error, request, response, next) => {
        console.error(error.message)
         if (error.name === 'CastError') {
          return response.status(400).send({ error: 'malformatted id' })
        }
      
        next(error)
      }

      app.use(errorHandler)

      
    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })



