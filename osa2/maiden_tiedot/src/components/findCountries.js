import React from 'react'
import Country from './Country'



const FindCountries = ({countries, findCountry}) => {
    
    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(findCountry))
    const isBelowThreshold = (currentValue) => currentValue === 0;
    const country = countries.map(names => names.name.toLowerCase().indexOf(findCountry))
    console.log(country)
    console.log(country.every(isBelowThreshold))
  
    const filterNames = countriesToShow.map(names => <ul key={names.id}>{names.name}</ul> )
    const filterIt = countriesToShow.map((country, i) => <Country country={country} key={i}/>)
    console.log(filterNames)

    if(country.filter(country => country > -1) && country.every(isBelowThreshold) === false && filterIt.length > 10){
        return(
    <p>too many matches, specify another filter</p>
        )
    }
    else if(country.filter(country => country > -1) && country.every(isBelowThreshold) === false && filterIt.length > 1){
        return(
    <p>{filterNames}</p>
        )    
    }
    else if(country.filter(country => country > -1) && country.every(isBelowThreshold) === false && filterIt.length < 2){
    return(
    <>{filterIt}</>
    )    
    }
    else
    return(
    <p>Search something</p>    
    )
    }

    export default FindCountries