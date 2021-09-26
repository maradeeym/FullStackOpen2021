import React from 'react'

const Persons = ({persons, findName, handleClick}) => {
    
    const personsToShow = persons.filter(contact => contact.name.toLowerCase().includes(findName))
    const isBelowThreshold = (currentValue) => currentValue === 0;
    const person = persons.map(contact => contact.name.toLowerCase().indexOf(findName))
    console.log(person)
    console.log(person.every(isBelowThreshold))

    const filterIt = personsToShow.map(contact => 
    <ul key={contact.id}>{contact.name} {contact.number}
      <button onClick={() => {
        if(window.confirm(`Delete ${contact.name}?`)){
        handleClick(contact.id)}}}>
        delete</button>
    </ul>)
    
    if(person.every(isBelowThreshold) === true)
    return(
    <p>Search something</p>
    )
    else
    return(
    <>{filterIt}</>
    )
    }

    export default Persons