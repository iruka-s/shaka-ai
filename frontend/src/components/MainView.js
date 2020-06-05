import React from 'react';

import Button from '@material-ui/core/Button';

// inputValueの初期値はワークスに応じて変わる必要がある
const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <div>
          {this.props.dbResults.map(item => (
            <div>
              <h1>{item.message}</h1>
              <p>{item.point}</p>
            </div>
          ))}

          <Button 
            variant="contained" 
            color="secondary"
            onClick={this.props.postMessage}
          >
              Hello World!
          </Button>
        </div>
    );
  }
}

export default MainView;