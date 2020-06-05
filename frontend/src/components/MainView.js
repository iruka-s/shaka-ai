import React from 'react';
import { Grid, TextField, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const shakaImage = require('../resources/shaka.jpg');


// inputValueの初期値はワークスに応じて変わる必要がある
const styles = theme => ({
  nextLifeTitle: {
    marginLeft: 'auto',
  },
});

class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={5}>
          <Grid item xs={12} />
          <Grid item xs={12} />
          
          {/* 来世の姿を表示 */}
          <Grid item xs={3} />
          <Grid item xs={2}>
            <Typography variant="h5" component="h2" align="right">
              あなたの来世
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="nextlife"
                  height="100"
                  image={shakaImage}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    釈迦
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    あなたはとてもいい人です。
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={5} />

          {/* メッセージ送信部 */}
          <Grid item xs={2} />
          <Grid item xs={7}>
            <TextField
              fullWidth
              id="message"
              label="送信メッセージ"
              // value={this.props.name}
              // onChange={(e) => this.props.addSelectName(e.target.value)}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained" 
              color="primary"
              onClick={this.props.postMessage}
              className={classes.sendButton}
            >
              送信
            </Button>
          </Grid>
          <Grid item xs={3} />          
        </Grid>

        {/* メッセージ+点数一覧表示 */}
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

export default withStyles(styles, { withTheme: true })(MainView);