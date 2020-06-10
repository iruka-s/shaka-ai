import React from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from "react-router-dom";
import useReactRouter from 'use-react-router';

import MainView from '../components/MainView';
import LoginView from '../components/LoginView';
import { ScreenPath, } from '../utils/CommonConst';

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
              // postMessage={props.postMessage}
              handleToPage={handleToPage}
            />}
          />
          <Route
            exact
            path={ScreenPath.MAIN.path}
            render={() => <MainView
              dbResults={props.dbResults}
              postMessage={props.postMessage}
            />}
          />
        </Switch>

        
      </main>
    </div>
  );
}
