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
  return (
    <div>
     <p>{props.content} {props.number}</p>
    </div>
  )
}
console.log(<Content />)

const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content content={part1.name} number={part1.exercises} />
      <Content content={part2.name} number={part2.exercises} />
      <Content content={part3.name} number={part3.exercises} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App