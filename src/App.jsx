
import { useState } from 'react'
import './App.css'



 const App=()=> {
  
  const [city,setCity]=useState("")
  const [weather,setWeather]=useState(null)
  const [error,setError]=useState("")

  const fetchWeather = async()=>{
   if(city && city.toLowerCase()!=="kakkanad"){
    setError("City not found");
    setWeather(null);
    return;
   }
   if(!city){
    setError("Please enther the city name")
    setWeather(null)

    return;
   }
   const apiKey = "8ac5c4d57ba6a4b3dfcf622700447b1e"; // Your API key
    const url = (`https://api.openweathermap.org/data/2.5/weather?q=kakkanad&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric&authuser=0`);
    try{
      const response = await fetch(url);
      const data = await response.json();
    
    if(response.ok){
      setWeather(data)
      setError("")
    }else{
      setWeather(null)
      setError(data.message);
    }}
    catch(err){
      setWeather(null)
      setError("Something went wrong,please try agin")
    }
  };



  return (
    <>
    <div className='weather-app'>
      <div className='container'>
        <h2>Weather APP</h2>
        <input type="text" placeholder='Add City Name ' value={city} onChange={(e)=>setCity(e.target.value)} className='input'/>
        <button onClick={fetchWeather} type="button" className="btn btn-outline-dark">Search</button>
        {error && <p style={{color:red}}>{error}</p>}
        {weather &&(
          <div className='weather-details'>
             <p>Temperature: {weather.main.temp}°C</p>
          <p>Feels Like: {weather.main.feels_like}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>


          </div>
        )
        }

      </div>
    </div>
    </>
  )
}

export default App
