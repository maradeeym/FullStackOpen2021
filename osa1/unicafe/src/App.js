import React, { useState } from 'react'

const Header = ({header}) => {
  return(
    <h1>{header}</h1>
  )
}
const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Stats = ({good, neutral, bad}) => {

  if (good + neutral + bad === 0){
    return(
      <p>No feed back given</p>
    )
  }

  else
  return(
    <div>
      <li>good {good}</li>
      <li>neutral {neutral}</li>
      <li>bad {bad}</li>
      <li>all {bad + neutral + good}</li>
      <li>average {(good - bad) / (bad + neutral + good)}</li>
      <li>positive {good / (bad + neutral + good)*100} %</li>
    </div>
    
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  const plusGood = () => setGood(good + 1)
  const plusNeutral = () => setNeutral(neutral + 1)
  const plusBad = () => setBad(bad + 1)

  return (
    <div>
      <Header header='give feedback'/>
      <Button handleClick={plusGood} text='good'/>
      <Button handleClick={plusNeutral} text='neutral'/>
      <Button handleClick={plusBad} text='bad'/>
      <h2>statistics</h2>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
