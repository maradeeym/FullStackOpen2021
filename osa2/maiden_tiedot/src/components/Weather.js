import React from 'react'

const Weather = ({weather}) => {
return(
    <> {weather && (
    <div>
        <h2>Weather in {weather.location.name} </h2>
        <p><b>Temperature:</b> {weather.current.temp_c} Celsius</p>
        <img src={weather.current.condition.icon} alt={weather.location.name} width="100px"/>
        <p><b>wind: </b>{weather.current.wind_kph} direction {weather.current.wind_dir} </p>

    </div>
    )}
    </>
)
    }
export default Weather