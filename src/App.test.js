import { render, screen } from '@testing-library/react';
import React from 'react'
import App from './App';
import axios from 'axios'
import { openCageResponse } from './specs/mocks/openCageMock'
import { openWeatherResponse } from './specs/mocks/openWeatherResponse'

let axiosSpy, getPositionSpy


jest.mock('react-chartjs-2', () => ({
  Line: () => <h1>Chart will be displayed here</h1>
}));

beforeEach(() => {
  axiosSpy = jest.spyOn(axios, 'get')
    .mockResolvedValueOnce(openCageResponse)
    .mockResolvedValueOnce(openWeatherResponse)

  getPositionSpy = jest.spyOn(App.prototype, 'getPosition')
    .mockReturnValue(
      {
        coords: {
          longitude: 60,
          latitude: 60,
        },
      }
    )
  render(<App />)

})

it('calls getPosition', () => {
  expect(getPositionSpy).toHaveBeenCalledTimes(1)

})

it('calls weather API', () => {
  expect(axiosSpy).toHaveBeenCalledTimes(2)
})

it('has city name',  () => {
  expect(screen.getByText("Your location: Virum",  { exact: false })).toBeInTheDocument();
});

it('has temperature',  () => {
  screen.debug()
  expect(screen.getByText("The temperature: 22℃",  { exact: false })).toBeInTheDocument();
});