import React from 'react'

const Header = (props) => {
  return (
    <h1> {props.course} </h1>
  )
}

const Part =(props) => {
  
  return(
    <div>
      <p>{props.content} {props.number}</p>
    </div>

  )
}

const Content = (props) => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <div>
    <Part content={part1} number={exercises1} />
    <Part content={part2} number={exercises2} />
    <Part content={part3} number={exercises3} />
    </div>
  )
}
const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App