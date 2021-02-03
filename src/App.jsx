import React from 'react'
import axios from 'axios'

class App extends React.Component {
  state = {
    location: {}
  }

  componentDidMount() {
    
    navigator.geolocation.getCurrentPosition(obj => {
      console.table(obj);
      this.setState({ location: obj.coords })
      
    })
    
  }

  render() {
    return (
      <div>
        I am rendered
        {this.state.location.latitude} 
      </div>
    );
  }
}

export default App;
