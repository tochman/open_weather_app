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


// const mockGeolocation = {
//   getCurrentPosition: jest.fn()
//     .mockImplementationOnce((success) => Promise.resolve(success({
//       coords: {
//         latitude: 55.7842,
//         longitude: 12.4518,
//       }
//     })))
// };
// global.navigator.geolocation = mockGeolocation;

let pos = {
  coords: {
    latitude: 55.7842,
    longitude: 12.4518
  }
}

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
  const mockGeolocation = {
    getCurrentPosition: jest.fn(axiosWeatherSpy = jest.spyOn(axios, 'get').mockReturnValueOnce(weatherMock))
  };
  
  global.navigator.geolocation = mockGeolocation;
  
  
  render(<App />)
})

it('calls weather API', () => {
  expect(axiosWeatherSpy).toHaveBeenCalledTimes(1)
})