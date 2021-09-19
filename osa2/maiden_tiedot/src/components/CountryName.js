import React from 'react'


const CountryName = ({ country, handleClick }) => (
    <div>
      {country.name}
      <button onClick={() => handleClick(country.name.toLowerCase())}>
        Show
      </button>
    </div>
  );

  export default CountryName;