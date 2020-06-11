import React from 'react';
import clsx from 'clsx';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AppBar, Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from "react-router-dom";
import useReactRouter from 'use-react-router';
import axios from 'axios';

import MainView from '../components/MainView';
import LoginView from '../components/LoginView';
import { ScreenPath, apiURLs } from '../utils/CommonConst';
import { alertMessages, componentLabelNames } from '../utils/MassageConst';

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

  const [token, setToken] = React.useState(""); 
  const [dbResults, setDBResults] = React.useState([]); 


  const postLogin = (username, email, password) => {

    var params = new URLSearchParams();
    params.append('username', username);
    params.append('email', email);
    params.append('password', password);

    axios.post(apiURLs.LOGIN, params)
    .then(response => {

      setToken(response.data.key);
      handleToMainPage();

    })
    .catch(err => {
      alert(alertMessages.FAILEDLOGIN);
    });
  }

  const postLogout = () => {

    axios.post(apiURLs.LOGOUT, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    })
    .then(response => {

      setToken("");
      setDBResults([]);
      handleToLoginPage();

    })
    .catch(err => {
      console.log(err);
    });
  }

  const getDBResults = () => {

    axios.get(apiURLs.GETDBRESULTS, {
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

    axios.post(apiURLs.POSTMESSAGE, params, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    })
    .then(response => {
      getDBResults()
    })
  }

  const handleToMainPage = () => {
    history.push(ScreenPath.MAIN.path);
  }

  const handleToLoginPage = () => {
    history.push(ScreenPath.LOGIN.path);
  }

  return (
    <div>

      <AppBar     
        position="fixed"
        className={clsx(classes.appBar)}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {componentLabelNames.APPTITLE}
          </Typography>

          {(token !== "" ) ? 
            <Tooltip title={componentLabelNames.LOGOUTBUTTON}>
              <IconButton 
                color="inherit" 
                aria-label="logout" 
                component="span"
                onClick={postLogout}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
            : 
            <div/>
          }

        </Toolbar>
      </AppBar>

      <br/>

      <main className={classes.content}>

      <Switch>
          <Route
            exact
            path={ScreenPath.LOGIN.path}
            render={() => <LoginView
              postLogin={postLogin}
              handleToMainPage={handleToMainPage}
            />}
          />
          <Route
            exact
            path={ScreenPath.MAIN.path}
            render={() => <MainView
              dbResults={dbResults}
              getDBResults={getDBResults}
              postMessage={postMessage}
              token={token}
              handleToLoginPage={handleToLoginPage}
            />}
          />
        </Switch>

        
      </main>
    </div>
  );
}
