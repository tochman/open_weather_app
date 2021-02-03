import React from 'react'
import axios from 'axios'

class App extends React.Component {
  state = {
    location: {}
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
      
    })
  }

  render() {
    
    return (
      <div>
        <h1>This is your geolocation</h1>
        <p>Latitude: </p>
        <p>Longitude: </p>
      </div>
    );
  }
}

export default App;
