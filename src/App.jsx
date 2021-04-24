import React, { Component } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import {
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react'

class App extends Component {
  state = {
    coords: null,
    weatherInfo: {}
  }

  getPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async componentDidMount() {
    let openCageKey = process.env.REACT_APP_OPEN_CAGE
    let openWeatherMapKey = process.env.REACT_APP_OPEN_WEATHER
    let pos = await this.getPosition()
    this.setState({ coords: pos.coords })
    let { latitude, longitude } = pos.coords
    const locationResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=${openCageKey}&q=${latitude}+${longitude}`)
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${openWeatherMapKey}&units=metric`)
    this.setState({ dailyTemp: weatherResponse.data.daily })
    const weatherInfo = {
      location: locationResponse.data.results[0].components.village ? locationResponse.data.results[0].components.village : locationResponse.data.results[0].components.postal_city,
      temperature: weatherResponse.data.current.temp,
      weather: weatherResponse.data.current.weather
    }
    this.setState({ weatherInfo: weatherInfo })
  }

  render() {
    const { weatherInfo, dailyTemp } = this.state;
    let labels = []
    let dataItems = []
    let data
    if (dailyTemp) {
      dailyTemp.forEach(day => {
        labels.push(new Date(day.dt * 1000).toLocaleDateString())
        dataItems.push(day.temp.day)
      })
      data = { labels: labels, datasets: [{ label: 'Daily Temp', data: dataItems }] }
    }
    return (
      <div className="main-container" data-cy="weather-display">
        <Header size="huge" textAlign="center">Your Location</Header>
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
                <Header data-cy="weather" icon>
                  <Icon name="snowflake" />
                  Weather:
                  <p>{weatherInfo.weather && (weatherInfo.weather[0].main)}</p>
                </Header>
              </Grid.Column>
            </Grid.Row>
            {dailyTemp && <Line data={data} />}
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default App