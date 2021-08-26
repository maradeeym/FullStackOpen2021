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

const StatsLine = (props) => {
  return(
    <tr> {props.text} 
      <td> {props.value}{props.percent}</td>
    </tr>
  )
}

const Stats = ({good, neutral, bad}) => {

  const all = (good + neutral + bad)
  const average = (good - bad) / (bad + neutral + good)
  const positive = (good / (bad + neutral + good) * 100)
    

  if (good + neutral + bad === 0){
    return(
      <p>No feedback given</p>
    )
  }
  else
  return(
    <div>
     <StatsLine text='good' value={good} />
     <StatsLine text='neutral' value={neutral} />
     <StatsLine text='bad' value={bad} />
     <StatsLine text='all' value={all} />
     <StatsLine text='average' value= {average}/>
     <StatsLine text='positive' value= {positive} percent='%' />

    </div>
  )

}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  
  const plusGood = () => {
    setAll(allClicks.concat('G'))
    setGood(good + 1)
  }
  const plusNeutral = () => {
    setAll(allClicks.concat('N'))
    setNeutral(neutral + 1)
  }
  const plusBad = () => {
    setAll(allClicks.concat('B'))
    setBad(bad + 1)
  }
  console.log(allClicks)

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
