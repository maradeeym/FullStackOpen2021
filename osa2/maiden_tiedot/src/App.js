import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
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

  console.log(countries)

  const handleFinderChange = (event) => {
    setFindCountry(event.target.value)
  }

  return (
    <div>
      <Filter findCountry={findCountry} handleFinderChange={handleFinderChange} />
      <FindCountries countries={countries} findCountry={findCountry}/>
    </div>
  );
}

export default App;
