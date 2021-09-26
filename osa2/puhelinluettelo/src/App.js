import React, { useState, useEffect } from 'react'
import './index.css'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './services/PersonList'
import Notification from './components/Notification'



const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ findName, setFinder ] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, SetMessageType] = useState(null)


  useEffect(() => {
    PersonList
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button', event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    if(persons.find(names => names.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace hte old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        PersonList
        .update(personToUpdate.id, { name: newName, number: newNumber})
        .then(response => {
          setPersons(persons.map(person => person.id !== personToUpdate.id ? person : response.data))
        })
        setNewName('')
        setNewNumber('')
        console.log('täällä')
      }
    }
    else
    PersonList
    .create(nameObject)
    .then(returnedPerson => {
      console.log(returnedPerson)
    setPersons(persons.concat(returnedPerson))
    setNewName('')
    setNewNumber('')
    setMessage(`Succesfully added ${newName}`)
    SetMessageType('success')
    setTimeout(() => {
      setMessage(null)
      SetMessageType(null)
    }, 5000)
    }
  )
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleFinderChange = (event) => {
    console.log(event.target.value)
    setFinder(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleClick = (id) => {
    const personToRemove = persons.find(person => person.id === id)
    PersonList
      .remove(id)
      .then(removedPerson => {
        console.log(removedPerson)
      setPersons(persons.splice(removedPerson))
      setFinder('')
      setMessage(`Succesfully removed ${personToRemove.name}`)
      SetMessageType('success')
      setTimeout(() => {
        setMessage(null)
        SetMessageType(null)
      }, 5000)
      })
    }
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className={messageType} />
      <Filter findName={findName} handleFinderChange={handleFinderChange} />
        <h3>add a new</h3>
      <PersonForm 
      addPerson={addPerson}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} findName={findName} handleClick={handleClick} />
    </div>
  )

}

export default App
