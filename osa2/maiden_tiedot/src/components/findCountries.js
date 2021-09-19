import React from 'react'
import Country from './Country'
import CountryName from './CountryName'
import Weather from './Weather'

const FindCountries = ({countries, findCountry, handleClick, weather}) => {
    
    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(findCountry))
    const filterIt = countriesToShow.map((country) => <Country country={country} key={country.name}/>)
    console.log(findCountry)
    
    if(findCountry === ''){
        return(
            <p>Search something</p>
        )
    }
    
    if(countriesToShow.length > 10){
        return(
    <p>too many matches, specify another filter</p>
        )
    }
    else if(countriesToShow.length === 1)
    return(
        <>
        {filterIt}
        <Weather weather={weather}/>
        </>
    )
    else if(countriesToShow.length < 6 && countriesToShow.length > 1)
    return(
    <div>
    {countriesToShow.map(country =>
           <CountryName country={country} handleClick={handleClick} key={country.name}/>)}
    </div>
    )
    else
    return(
        <></> 
    )
    }

    export default FindCountries