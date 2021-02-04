import { render, screen } from '@testing-library/react';
import React from 'react'
import App from '../App';
import axios from 'axios'

// Two different mocks / stubs
// Two different spy variable
// mockReturnValueOnce on each mock
// Check if called
// jest.spyOn(axios,'get').mockReturnValueOnce(mock1)
// jest.spyOn(axios,'get').mockReturnValueOnce(mock2)
// Have to mock navigator.geolocation

let weatherMock = {
  data: {
    current: {
      temp: 22,
      weather: [
        {main: "Snow"}
      ]
    }
  }
}

let axiosWeatherSpy;
let axiosLocationSpy;

beforeEach(() => {
  jest.spyOn(screen.navigator.geolocation.getCurrentPosition(), 'get').mockImplementation(() => {
    console.log()
    //axiosWeatherSpy = jest.spyOn(axios, 'get').mockReturnValueOnce(weatherMock)
  })
  
  
  
  render(<App />)
})

it('calls weather API', () => {
  expect(axiosWeatherSpy).toHaveBeenCalledTimes(1)
})