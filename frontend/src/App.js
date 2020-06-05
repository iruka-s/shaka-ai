import React, { Component } from 'react';
import axios from 'axios';

import ShakaDrawer from './utils/ShakaDrawer'
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
          console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    }

    postMessage(){
      var params = new URLSearchParams();
      params.append('message', '私は昨日犯罪を犯しました');
      axios.post(postMessageURL, params)
      .then(response => {
        console.log(response.data)
      })
    }
    

    render() {
      return (
        <ShakaDrawer
          dbResults={this.state.dbResults}
          postMessage={this.postMessage}
      />
        );
    }
}

export default App;