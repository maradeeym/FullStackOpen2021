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
  const [weather, setWeather] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      if(findCountry !== ''){
      const countriesToShow = response.data.filter(country => country.name.toLowerCase().includes(findCountry.toLowerCase()))
        console.log('promise fulfilled')
        setCountries(countriesToShow)
      }
      })
  }, [findCountry])

  useEffect(() => {
    const baseUrl = "http://api.weatherapi.com/v1/current.json";
    const ACCESS_KEY = process.env.REACT_APP_API_KEY;
    if(countries.length === 1){
    const capital = countries.map(country => country.capital)
      if(capital[0]){
        axios.get(`${baseUrl}?key=${ACCESS_KEY}&q=${capital[0]}&aqi=no`)
          .then(response => {
            console.log('toimii')
            setWeather(response.data);
          })}};}, [countries]);

          console.log(weather)

  const handleFinderChange = (event) => {
    setFindCountry(event.target.value)
  }

  const handleClick = (countryName) => {
    setFindCountry(countryName)
  }

  return (
    <div>
      <Filter findCountry={findCountry} handleFinderChange={handleFinderChange} />
      <FindCountries countries={countries} findCountry={findCountry} handleClick={handleClick} weather={weather}/>
    </div>
  );
}

export default App;
