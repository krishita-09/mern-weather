// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import './App.css'

// function App() {

//   const API_KEY = 'aaf7eb9d635813ed8cea6b774faf20f9'
//   const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
//   return (
//     <>
//     <h1 className="text-6xl font-bold underline">
//       Hello world!
//     </h1>
//     </>
//   )
// }

// export default App



// //https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=aaf7eb9d635813ed8cea6b774faf20f9



import { useState, useEffect } from 'react';
import './App.css';





function App() {
  const [city, setCity] = useState('Mumbai');
  const [temperature, setTemperature] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [weatherIcon, setWeatherIcon] = useState(''); 
  const [data, setData] = useState({})

  const API_KEY = 'aaf7eb9d635813ed8cea6b774faf20f9'
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

  const getWeatherData = async (BASE_URL) => {
    let response = await fetch(BASE_URL)
    return await response.json();
  }

  useEffect(() => {
    getWeatherData(BASE_URL).then((d) => {
      setData(d);
      // a = setTemperature(`${Math.round(d.main.temp - 273.15)}°C`);
      // b = setFeelsLike(`${Math.round(d.main.feels_like - 273.15)}°C`);
      // c = setWeatherIcon(weatherIcons[d.weather[0].main.toLowerCase()]);
      console.log(data)
    })
  }, [city])




  const weatherIcons = {
    sunny: '☀️',
    clouds: '☁️',
    rain: '🌧️',
    snow: '❄️',
    default: '🥺',
    clear: '🥸',
    dust: '😷'
  }

  const handleSearch = () => {
    
    // setTemperature('25°C')
    // setFeelsLike('Feels like 27°C')
    // setWeatherIcon(weatherIcons.default)

    setTemperature(`${Math.round(data.main.temp - 273.15)}°C`);
    setFeelsLike(`${Math.round(data.main.feels_like - 273.15)}°C`);
    setWeatherIcon(weatherIcons[data.weather[0].main.toLowerCase()]);

  };

  return (
    <div className="App">
      <h1 className="text-6xl font-bold">Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value)
            console.log(e.target.value)
          }}
          />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="weather-container">
        <div className="temperature">{temperature}</div>
        <div className="weather-icon">{weatherIcon}</div>
        <div className="feels-like">{feelsLike}</div>
      </div>
    </div>
  );
}

export default App;
//