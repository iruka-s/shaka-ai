import React from 'react';
import clsx from 'clsx';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MainView from '../components/MainView';


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
        <div/>

        <MainView
          dbResults={props.dbResults}
          postMessage={props.postMessage}
        />
      </main>
    </div>
  );
}
