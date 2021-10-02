const express = require('express')
const app = express()
const morgan = require('morgan')

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '));

app.use(express.json())

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

      app.listen(3001, () => {
        console.log('App listening port 3000 ......')
      })

      app.get('/api/persons', (req, res) => {
        res.json(persons)
      })  
      
    app.get('/api/persons/:id', (req, res) => {
      const id = Number(req.params.id)
      const person = persons.find(person => person.id === id)
      if(person){
      res.json(person)}
      else {
        res.status(404).end()
      }
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
        if (!body.name || !body.number) {
          return res.status(400).json({ 
            error: 'content missing' 
          })
        }
        else if(persons.find(person => person.name === body.name)){
          return res.status(400).json({ error: 'name must be unique' })
        }
        else{
        const person = {
          name: body.name,
          number: body.number,
          id: generateId()
        }
      
        persons = persons.concat(person)

        res.json(person)
      }})

  
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })



