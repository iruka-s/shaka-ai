import React from 'react';
import { Grid, TextField, Button, Card, CardActionArea,
  CardContent, CardMedia, Typography, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const shakaImage = require('../resources/shaka.jpg');


// inputValueの初期値はワークスに応じて変わる必要がある
const styles = theme => ({
  table: {
    maxWidth:800
  },
  nextLifeTitle: {
    marginLeft: 'auto',
  },
  totalPointText: {
    marginTop: 160,
  },
});

class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sendMessage: "",
    };
    this.handleToSendMessage = this.handleToSendMessage.bind(this);
    this.handleToSendButton = this.handleToSendButton.bind(this);
    this.calcTotalPoint = this.calcTotalPoint.bind(this);
  }

  handleToSendMessage(value){
    this.setState({ sendMessage: value })
  }

  handleToSendButton(){
    this.props.postMessage(this.state.sendMessage)
    this.setState({ sendMessage: "" })
  }

  calcTotalPoint() {
    
    let totalFloatPoint = 0;

    for(var index in  this.props.dbResults) {
      totalFloatPoint = totalFloatPoint + this.props.dbResults[index].point;
    }
    return(Math.floor(totalFloatPoint))
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
          <Grid item xs={2}>
            <Typography className={classes.totalPointText} variant="h5" component="h2" align="left">
              合計点数：{this.calcTotalPoint()}
            </Typography>
          </Grid>
          <Grid item xs={3} />

          {/* メッセージ送信部 */}
          <Grid item xs={2} />
          <Grid item xs={7}>
            <TextField
              fullWidth
              id="message"
              label="送信メッセージ"
              value={this.state.sendMessage}
              onChange={(e) => this.handleToSendMessage(e.target.value)}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained" 
              color="primary"
              onClick={this.handleToSendButton}
              className={classes.sendButton}
            >
              送信
            </Button>
          </Grid>
          <Grid item xs={3} />          
        </Grid>

        {/* メッセージ+点数一覧表示 */}
        <Grid container alignItems="center" justify="center">
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {this.props.dbResults.reverse().map((item) => (
                <TableRow key={item.name}>
                  <TableCell component="th" scope="row">
                    {item.message}
                  </TableCell>
                  <TableCell align="right">{item.point}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>

      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MainView);