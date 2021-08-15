import React from 'react'

const Header = (props) => {
  console.log(props)
  return (
    <h1> {props.course} </h1>
  )
}
/*
const Part =(props) => {
  
  return(
    <div>
      <p>{props.content} {props.number}</p>
    </div>

  )
}
console.log(<Part />)

const Content = (props) => {
  return (
    <div>
    <Part content={props.name} number={props.exercises} />
    </div>
  )
}
*/
const Content = (props) => {

  const part = props.parts.map(part => part.name).map(list => <li key={list.toString()}> {list} </li>)
  console.log(part)
 
  return (
    <div>
     <p> {part} </p>
    </div>
  )
}
console.log(<Content />)

const Total = (props) => {

 
  const totalExercises = props.parts.map(part => part.exercises)
  
  const sum = (acc, currentValue) => acc + currentValue;

  console.log(totalExercises.reduce(sum))

  return (
    <p>Number of exercises {totalExercises.reduce(sum)}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
     
     
    </div>
  )
}

export default App