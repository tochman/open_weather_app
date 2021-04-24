import { render, screen } from '@testing-library/react';
import React from 'react'
import App from '../App';
import axios from 'axios'
import { openCageResponse } from './mocks/openCageMockResponse'
import { openWeatherResponse } from './mocks/openWeatherMockResponse'

let axiosSpy, getPositionSpy

jest.mock('react-chartjs-2', () => ({
  Line: () => <h1>Chart will be displayed here</h1>
}));

describe('App.jsx', () => {

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

  it.only('is expected to call getPosition', () => {
    expect(getPositionSpy).toHaveBeenCalledTimes(1)
  })

  it('is expected to make calls to both API\'s', () => {
    expect(axiosSpy).toHaveBeenCalledTimes(2)
  })

  it('is expected to render city name', () => {
    expect(screen.getByText("Your location: Virum", { exact: false }))
      .toBeInTheDocument();
  });

  it('is expected to render temperature', () => {
    expect(screen.getByText("The temperature: 22℃", { exact: false }))
      .toBeInTheDocument();
  });
});
