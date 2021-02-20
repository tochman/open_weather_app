import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import TestComponent from '../TestComponent'

let setContentSpy, useStateSpy, changeContentSpy, wrapper
const props = {
  changeContent: jest.fn(),

}
beforeEach(() => {
   render(<TestComponent {...props}/>)
})

it('displays Greeting', () => {
  expect(screen.getByText('Hello World')).toBeInTheDocument()
});

describe('Button click', () => {
  beforeEach(() => {
    // jest.spyOn(screen, 'changeContent')
    changeContentSpy = jest.spyOn(props, "changeContent");
    // changeContentSpy.mockImplementation(content => [content, setContent]);


    const button = screen.getByRole('button')
    fireEvent.click(button)
  });

  it('calls on changeContent', () => {
    expect(changeContentSpy).toHaveBeenCalled()
  });

  it('changes text', () => {
    expect(screen.getByText('Hello Venus')).toBeInTheDocument()
  });
});