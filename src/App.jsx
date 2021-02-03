import React from 'react'
import axios from 'axios'
import {
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react'

class App extends React.Component {
  state = {
    weatherInfo: {}
  } 

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async pos => {
      // this.setState({ location: response.coords })
      let { latitude, longitude } = pos.coords
      const locationResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=752ad146959d4bc2a0b83bc4aab0ec9a&q=${latitude}+${longitude}`)
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=5091ea391e19fef677e0e8307edbf904&units=metric`)
      
      const weatherInfo = {
        location: locationResponse.data.results[0].components.postal_city,
        temperature: weatherResponse.data.current.temp,
        weather: weatherResponse.data.current.weather
      }
      this.setState({ weatherInfo: weatherInfo })
      
    })
  }

  render() {
    const { weatherInfo } = this.state;

    return (
      <div className="main-container"  data-cy="weather-display">
        <Header  size="huge" textAlign="center">Your Location</Header>
        <Segment className="main-segment" placeholder>
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical />

            <Grid.Row>
              <Grid.Column>
                <Header data-cy="data" icon>
                  <Icon name="world" />
                  Your location: {weatherInfo.location} 
                  <br></br>
                  The temperature: {weatherInfo.temperature}℃
                </Header>
              </Grid.Column>

              <Grid.Column>
                <Header icon>
                  <Icon name="snowflake" />
                  Weather:
                </Header>
                <p>{weatherInfo.weather && (weatherInfo.weather[0].main)}</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default App;
