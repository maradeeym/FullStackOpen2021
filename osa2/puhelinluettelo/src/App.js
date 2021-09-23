import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personList from './services/PersonList'
import PersonList from './services/PersonList'




const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ findName, setFinder ] = useState('')

  useEffect(() => {
    personList
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'persons')
  console.log(persons)

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button', event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    if(persons.find(names => names.name === newName))
    window.alert(`${newName} is already added to phonebook`)
    else
    personList
    .create(nameObject)
    .then(returnedPerson => {
      console.log(returnedPerson)
    setPersons(persons.concat(returnedPerson))
    setNewName('')
    setNewNumber('')
  })
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
    PersonList
      .remove(id)
      .then(removedPerson => {
      setPersons(persons.splice(removedPerson))
      setFinder('')
      })
    
    }
    
  return (
    <div>
      <h2>Phonebook</h2>
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
