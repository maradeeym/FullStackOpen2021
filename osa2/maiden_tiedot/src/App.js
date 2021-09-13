import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FindCountries from './components/findCountries'

const Filter = (props) => { 
  return(
  <form>
      <div>
        find countries <input 
        value={props.findCountry}
        onChange={props.handleFinderChange}
        />
   </div>
  </form>
)
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [findCountry, setFindCountry] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])


  const handleFinderChange = (event) => {
    setFindCountry(event.target.value)
  }

  const handleClick = (countryName) => {
    setFindCountry(countryName)
  }

  return (
    <div>
      <Filter findCountry={findCountry} handleFinderChange={handleFinderChange} />
      <FindCountries countries={countries} findCountry={findCountry} handleClick={handleClick}/>
    </div>
  );
}

export default App;
