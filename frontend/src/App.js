import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

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
      axios.get('http://localhost:8000/api/v1/shakas/')
        .then(res => {
          this.setState({ shakas: res.data });
          console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    }

    postShakas(){
      axios.post('http://localhost:8000/api/v1/shakas/', {
        "message" : "テストメッセージ",
        "point" : 30
      })
      .then(response=>{console.log(response.data)})
    }
    

    render() {
      return (
        <div>
          {this.state.shakas.map(item => (
            <div key={item.id}>
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