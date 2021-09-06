import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([ ])
  const [ newName, setNewName ] = useState('')

  console.log(persons)
  console.log(newName)

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    }
    if(persons.find(names => names.name === newName))
    window.alert(`${newName} is already added to phonebook`)
    else
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(names => <ul key={names.id}>{names.name} </ul>)}  
    
    </div>
  )

}

export default App
