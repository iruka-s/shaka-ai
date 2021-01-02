import { Box, Button, Card, List, ListItem, TextField } from '@material-ui/core';
import AccountCircle from "@material-ui/icons/AccountCircle";
import React from 'react';
import { withRouter } from 'react-router-dom';

import { componentLabelNames } from '../utils/MassageConst';

class LoginView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        ...this.state,
        [name]: value
    });
}

  handleToLoginButton = (event) => {
    this.props.postLogin(this.state.username, this.state.email, this.state.password)
  };

  render() {
    return (
      <Card>
        <Box p={5} textAlign='center'>
          <AccountCircle fontSize='large' />
          <List>
          <ListItem>
              <TextField
                type='text'
                label={componentLabelNames.USERNAME}
                name='username'
                value={this.state.username}
                onChange={this.handleInputChange}
                margin='normal'
                variant='outlined'
                fullWidth
                required
              />
            </ListItem>
            <ListItem>
              <TextField
                type='mail'
                label={componentLabelNames.EMAIL}
                name='email'
                value={this.state.email}
                onChange={this.handleInputChange}
                margin='normal'
                variant='outlined'
                fullWidth
                required
              />
            </ListItem>
            <ListItem>
              <TextField
                type='password'
                label={componentLabelNames.PASSWORD}
                name='password'
                value={this.state.password}
                onChange={this.handleInputChange}
                margin='normal'
                variant='outlined'
                fullWidth
                required
              />
            </ListItem>
          </List>
          <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              onClick={this.handleToLoginButton}
              style={{ marginTop: 20 }}
          >
            {componentLabelNames.LOGINBUTTON}
          </Button>

        </Box>
      </Card>
    );
  }

}

export default withRouter(LoginView);