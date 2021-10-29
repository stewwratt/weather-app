import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

// our application is a weather app
// what will our app do??
// 1. we wamt to grab data from a database somewhere of the weather API call (application programming interface)
// State! Plain javascript object that holds the current state of information
// dynamic data
// in our app we will be using hooks to handle our weather data state

//useEffect hook tells our component app to do something after rendering

/* EXERCISE TIME
Finish the functionality of weather algo app
add & display the following data points
humidity, minimum temp and weather icons
*/

function App() {
  const [search, setSearch] = useState('')

  const [allData, setAllData] = useState({
    city:'',
    country:'',
    temperature:'',
    humidity:'',
    minimumTemp:'',
    weatherIcon: ''
  })

  useEffect(() => {
    //we add what we want to happen after rendering
    // fetch the database information the API of weather
      // Weather database
      fetchData()
  }, [])

  const fetchData = async (city) => {
    try {
      const APIKEY = 'dca4c3ebab7f00126be8c5d5fadf4205'
      //axios is a library which will allow us to make requests to the backend
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`)
      await setAllData({
        city: result.data.name,
        country: result.data.sys.country,
        temperature: convertFromKelvinToCelcius(result.data.main.temp),
        humidity: result.data.main.humidity,
        minimumTemp: convertFromKelvinToCelcius(result.data.main.temp_min),
        weatherIcon: result.data.weather[0].icon
      }) 
    } catch (error) {
      console.log('API not loaded correctly or loaded for the first time!')
    }
  }

  function convertFromKelvinToCelcius(tempInKelvin) {
    return Math.floor((tempInKelvin - 273.15)*100)/100
  } 

  function selectTemperatureConversion(){

  }
  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    console.log(search)
    event.preventDefault()
    fetchData(search)
  }

  return (
    //section tag in react for sections and main tag for the main build
    //under main we will have sections for the form and for displaying results
    <main>
      <div className="App">
        <form onSubmit = {handleSubmit}>
          <input
            value={search}
            type='text'
            name='city'
            placeholder='City Name'
            onChange={handleChange}
          />
          <button for='city'>Search</button>
        </form> 
          <section>
            <div>
              <img src = {'https://openweathermap.org/img/wn/'+allData.weatherIcon+'@2x.png'}/>
            </div>
            <h1>{allData.city}</h1>
            <h3>{allData.country}</h3>
            <div>
              <div>
                <h3> TEMPERATURE </h3>
                <h3>{allData.temperature}°C </h3>
              </div>
              <div>
                <h3> MINIMUM TEMPERATURE </h3>
                <h3>{allData.minimumTemp}°C </h3>
              </div>
              <div>
                <h3> HUMIDITY </h3>
                <h3>{allData.humidity}% </h3>
              </div>
            </div>
          </section>
      </div>
    </main>
  );
}

export default App;
