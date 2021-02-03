import React from 'react'
import axios from 'axios'

class App extends React.Component {
  state = {
    weatherInfo: {}
  } 


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async pos => {
      // this.setState({ location: response.coords })
      let { latitude, longitude } = pos.coords
      const locationResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=752ad146959d4bc2a0b83bc4aab0ec9a&q=${latitude}+${longitude}`)
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=5091ea391e19fef677e0e8307edbf904`)
      const weatherInfo = {
        location: locationResponse.data.results[0].components.postal_city,
        temperature: weatherResponse.data.current.temp
      }
      this.setState({ weatherInfo: weatherInfo })
    })
  }

  render() {
    
    return (
      <div data-cy="weather-display">
        <h1>Your Location</h1>
        <div data-cy="location">
          Your location is: {this.state.weatherInfo.location}
        </div>
        <div data-cy="temp">
          The temperature is: {this.state.weatherInfo.temperature}℃
        </div>
      </div>
    );
  }
}

export default App;
