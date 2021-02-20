// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const mockGeolocation = {
  getCurrentPosition: jest.fn()
    // .mockResolvedValue({coords: {latitude: 20, longitude: 55}})
    .mockImplementation(() => {
      Promise.resolve({
        coords: {
          latitude: 55.7842,
          longitude: 12.4518,
        }
      })
    })
};
global.navigator.geolocation = mockGeolocation;