import React, {useState} from 'react'

const TestComponent = () => {
  const [content, setContent] = React.useState('Hello World')
  const changeContent = (value) => {
    setContent(value)
  }
  return (
    <React.Fragment>
      <h1>{content}</h1>
      <button
        onClick={() => changeContent('Hello Venus')}
      >click me!</button>
    </React.Fragment>
  )
}

export default TestComponent