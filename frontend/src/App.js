import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {getAllMessageURL, postMessageURL} from './utils/CommonConst';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      shakas: []
    };
    this.getShakas = this.getShakas.bind(this);
    this.postShakas = this.postShakas.bind(this);
  }

    componentDidMount() {
        this.getShakas();
    }

    getShakas() {
      axios.get(getAllMessageURL)
        .then(res => {
          this.setState({ shakas: res.data });
          console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    }

    postShakas(){
      var params = new URLSearchParams();
      params.append('message', '私は昨日犯罪を犯しました');
      axios.post(postMessageURL, params)
      .then(response => {
        console.log(response.data)
      })
    }
    

    render() {
      return (
        <div>
          {this.state.shakas.map(item => (
            <div>
              <h1>{item.message}</h1>
              <p>{item.point}</p>
            </div>
          ))}

          <Button 
            variant="contained" 
            color="secondary"
            onClick={this.postShakas}
          >
              Hello World!
          </Button>
        </div>
        );
    }
}

export default App;