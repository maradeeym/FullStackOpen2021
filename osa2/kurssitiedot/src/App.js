import React from 'react'

const App = () => {

  const Course = (props) => {

    const Header = () => {
      return(
        <h1>{props.course.name}</h1>
      )
    }
    const Content = () => {
      
      const Part = () => {
        return(
          <div>
          <ul>{props.course.parts.map(part =>
          <p key={part.id}>
            {part.name} {part.exercises}</p>)}
          </ul>
          </div>
        )
      }

      return (
        <div>
        <Part />
        </div>
      )
    }

      return (
        <div>
       <Header />
       <Content />
       </div>
      )
    
  }

  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App;
