import React from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from "react-router-dom";
import useReactRouter from 'use-react-router';
import axios from 'axios';

import MainView from '../components/MainView';
import LoginView from '../components/LoginView';
import { ScreenPath, getAllMessageURL, postMessageURL } from '../utils/CommonConst';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: "#740A00",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


export default function ShakaDrawer(props) {

  const classes = useStyles();
  const { history } = useReactRouter();

  const [token, setToken] = React.useState(); 
  const [dbResults, setDBResults] = React.useState([]); 


  const postLogin = (username, email, password) => {

    var params = new URLSearchParams();
    params.append('username', username);
    params.append('email', email);
    params.append('password', password);

    axios.post('http://localhost:8000/api/v1/rest-auth/login/', params)
    .then(response => {

      console.log(response.data.key)
      setToken(response.data.key);
      handleToPage(ScreenPath.MAIN.id);

    })
    .catch(err => {
      console.log(err);
    });
  }

  const getDBResults = () => {

    axios.get(getAllMessageURL, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    })
      .then(res => {
        setDBResults(res.data);
      })
      .catch(err => {
        console.log(err);
      });

  }

  const postMessage = (sendMessage) => {

    var params = new URLSearchParams();
    params.append('message', sendMessage);

    axios.post(postMessageURL, params, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    })
    .then(response => {
      getDBResults()
    })

  }

  const handleToPage = (moveToPage) => {

    switch (moveToPage){
      case ScreenPath.LOGIN.id:
        history.push(ScreenPath.LOGIN.path);
        break;

      case ScreenPath.MAIN.id:
        history.push(ScreenPath.MAIN.path);
        break;

      default:
        break;
    }
  }

  return (
    <div>

      <AppBar     
        position="fixed"
        className={clsx(classes.appBar)}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            釈迦AI
          </Typography>
        </Toolbar>
      </AppBar>

      <br/>

      <main className={classes.content}>

      <Switch>
          <Route
            exact
            path={ScreenPath.LOGIN.path}
            render={() => <LoginView
              // dbResults={props.dbResults}
              postLogin={postLogin}
              handleToPage={handleToPage}
            />}
          />
          <Route
            exact
            path={ScreenPath.MAIN.path}
            render={() => <MainView
              dbResults={dbResults}
              getDBResults={getDBResults}
              postMessage={postMessage}
            />}
          />
        </Switch>

        
      </main>
    </div>
  );
}
