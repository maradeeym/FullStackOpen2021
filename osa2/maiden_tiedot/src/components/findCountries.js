import React from 'react'
import Country from './Country'

const CountryName = ({ country, handleClick }) => (
    <div>
      {country.name}
      <button onClick={() => handleClick(country.name.toLowerCase())}>
        Show
      </button>
    </div>
  );

const FindCountries = ({countries, findCountry, handleClick}) => {
    
    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(findCountry))
    const isBelowThreshold = (currentValue) => currentValue === 0;
    const country = countries.map(names => names.name.toLowerCase().indexOf(findCountry))
    //const filterNames = countriesToShow.map(names => <ul key={names.id}>{names.name} <button type="submit" value="Finland" onClick="finland">Show</button></ul> )
    const filterIt = countriesToShow.map((country, i) => <Country country={country} key={country.name}/>)
    console.log(countriesToShow)

    if(country.filter(country => country > -1) && country.every(isBelowThreshold) === false && filterIt.length > 10){
        return(
    <p>too many matches, specify another filter</p>
        )
    }
    else if(country.filter(country => country > -1) && country.every(isBelowThreshold) === false && filterIt.length > 1){
        return(
    <>
        {countriesToShow.map(country =>
        <p key={country.id}>
           <CountryName country={country} handleClick={handleClick} />
        </p> )}
    </>
        )    
    }
    else if(country.filter(country => country > -1) && country.every(isBelowThreshold) === false && filterIt.length < 2){
    return(
        <div>
        
            {countriesToShow.map((country, i) => <Country country={country} key={country.name}/>)}
        
        </div>
    )    
    }
    else
    return(
    <p>Search something</p>    
    )
    }

    export default FindCountries