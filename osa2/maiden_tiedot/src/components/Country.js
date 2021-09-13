import React from 'react'

  const Name = ({country}) => {
    return(
    <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p> 
    </div>
    )
  }
  

  const Language = (props) => {
    return(
      <li>
      {props.language.name}
      </li>
    )
  }

  const Languages = ({country}) => {
    const rows = () => country.map((language) =>
    <Language language={language} key={language.name}/>)
    return (
        <>
            {rows()}
        </>
    )
  }

  const Flag = ({country}) => {
    return(
        <ul>
        <img src={country.flag} alt={country.name} width="200px" key={country.id}/>
        </ul>
    )
  }

  const Country = ({country}) => {
    return (
      <div>
     <Name country={country}/>
     <Languages country={country.languages}/>
     <Flag country={country}/>
     </div>
    )
  
}

export default Country