const express = require('express')
const app = express()

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
/*
    const person = {
      name: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    }
*/
let time = new Date()

    app.get('/', (req, res) => {
        res.send('<h1>Hello World!</h1>')
      })

      app.get('/api/persons', (req, res) => {
        res.json(persons)
      })  
      
    app.get('/api/persons/:id', (req, res) => {
      const id = Number(req.params.id)
      const person = persons.find(person => person.id === id)
      if(person){
      res.json(persons.map(person => person.name))}
      else{
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

    

      console.log(time)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)



