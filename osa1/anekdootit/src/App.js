import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  //const array = Array.apply(0, new Array(6)).map(Number.prototype.valueOf,0)

  const Button = (props) => {
    return(
      <button onClick={props.handleClick}>{props.text}</button>
    )
  }

const [selected, setSelected] = useState(0)
const [points, setPoints] = useState(new Array(7).fill(0))

  const randomInt = () => {
    setSelected(Math.floor(Math.random() * 7))
  }
  
  const givePoints = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  //const mostVotes = Math.max(points)
  console.log(Math.max(...points))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p> has {points[selected]} votes</p>
      <Button handleClick={randomInt} text='next anecdote' />
      <Button handleClick={givePoints} text='vote' />
      <h2>Anecdote with the most votes</h2>
      <p> {anecdotes[points.indexOf(Math.max(...points))]} has {Math.max(...points)} points </p>

    </div>
  )
}

export default App