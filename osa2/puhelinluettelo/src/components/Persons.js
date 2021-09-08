import React from 'react'


const Persons = ({persons, findName}) => {
    
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(findName))
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

    export default Persons