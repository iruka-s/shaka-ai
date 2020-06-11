import React, { Component } from 'react';

import ShakaDrawer from './utils/ShakaDrawer'
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
    };
  }

    render() {
      return (
      <Router>
        <ShakaDrawer/>
      </Router>
      );
    }
}

export default App;