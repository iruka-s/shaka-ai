import { Box, Button, Card, List, ListItem, TextField } from '@material-ui/core';
import AccountCircle from "@material-ui/icons/AccountCircle";
import React from 'react';

class LoginView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
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

  render() {
    return (
      <Card>
        <Box p={5} textAlign='center'>
          <form onSubmit={this.handleSubmit}>
            <AccountCircle fontSize='large' />
            <List>
            <ListItem>
                <TextField
                  type='text'
                  label='User name'
                  name='userName'
                  value={this.state.userName}
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
                  label='Email'
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
                  label='Password'
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
                style={{ marginTop: 20 }}
            >
              Login
            </Button>
          </form>

        </Box>
      </Card>
    );
  }

}

export default LoginView;