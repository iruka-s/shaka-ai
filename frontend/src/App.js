import React, { Component } from 'react';
import axios from 'axios';

import ShakaDrawer from './utils/ShakaDrawer'
import { BrowserRouter as Router } from 'react-router-dom';
import {getAllMessageURL, postMessageURL} from './utils/CommonConst';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dbResults: []
    };
    this.getDBResults = this.getDBResults.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

    componentDidMount() {
        this.getDBResults();
    }

    getDBResults() {
      axios.get(getAllMessageURL)
        .then(res => {
          this.setState({ dbResults: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    }

    postMessage(sendMessage){
      var params = new URLSearchParams();
      params.append('message', sendMessage);

      axios.post(postMessageURL, params)
      .then(response => {
        this.getDBResults()
      })

      
    }
    

    render() {
      return (
      <Router>
        <ShakaDrawer
          dbResults={this.state.dbResults}
          postMessage={this.postMessage}
        />
      </Router>
      );
    }
}

export default App;