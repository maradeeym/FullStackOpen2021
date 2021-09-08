import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
    { name: 'Dan Abramov', number: '12-43-234345', id: 3},
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ findName, setFinder ] = useState('')

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(findName))
  console.log(personsToShow)

  const Filter = () => {
  const isBelowThreshold = (currentValue) => currentValue === 0;
  const person = persons.map(contact => contact.name.toLowerCase().indexOf(findName))
  console.log(person)
  console.log(person.every(isBelowThreshold))

  const filterIt = personsToShow.map(contact => <ul key={contact.id}>{contact.name} {contact.number}</ul> )
  if(person.every(isBelowThreshold) === true)
  return(
  <p>Search something</p>
  )
  else
  return(
  <>{filterIt}</>
  )
  }

  const addNote = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    if(persons.find(names => names.name === newName))
    window.alert(`${newName} is already added to phonebook`)
    else
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFinderChange = (event) => {
    setFinder(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
      <div>
          filter shown with: <input 
          value={findName}
          onChange={handleFinderChange}
          />
        </div>
      </form>
        <h2>add new</h2>
        <form onSubmit={addNote}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNumberChange}
          />
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Filter />
    </div>
  )

}

export default App
