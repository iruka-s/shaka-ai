import React from 'react';
import { Grid, TextField, Button, Card, CardActionArea,
  CardContent, CardMedia, Typography, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import { componentLabelNames, nextLife } from '../utils/MassageConst';


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

  componentDidMount() {
    if (this.props.token !== "") {
      this.props.getDBResults();
    } else {
      this.props.handleToLoginPage();
    }
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

  judgeNextLife(totalPoint) {
    
    if(totalPoint >= 500){
      let nextLifeImage = require('../resources/shaka.jpg');
      return {NEXTLIFEIMAGE: nextLifeImage, NAME: nextLife.SHAKA.NAME, EXPLAIN: nextLife.SHAKA.EXPLAIN};
    } 
    else if(totalPoint > 350) {
      let nextLifeImage = require('../resources/kannon.png');
      return {NEXTLIFEIMAGE: nextLifeImage, NAME: nextLife.KANNON.NAME, EXPLAIN: nextLife.KANNON.EXPLAIN};
    } 
    else if(totalPoint > 250) {
      let nextLifeImage = require('../resources/fudou.png');
      return {NEXTLIFEIMAGE: nextLifeImage, NAME: nextLife.FUDOU.NAME, EXPLAIN: nextLife.FUDOU.EXPLAIN};
    } 
    else if(totalPoint > 150) {
      let nextLifeImage = require('../resources/ebisu.png');
      return {NEXTLIFEIMAGE: nextLifeImage, NAME: nextLife.EBISU.NAME, EXPLAIN: nextLife.EBISU.EXPLAIN};
    } 
    else if(totalPoint > 100) {
      let nextLifeImage = require('../resources/kaiso.png');
      return {NEXTLIFEIMAGE: nextLifeImage, NAME: nextLife.KAISO.NAME, EXPLAIN: nextLife.KAISO.EXPLAIN};
    } 
    else if(totalPoint > -100) {
      let nextLifeImage = require('../resources/human.png');
      return {NEXTLIFEIMAGE: nextLifeImage, NAME: nextLife.HUMAN.NAME, EXPLAIN: nextLife.HUMAN.EXPLAIN};
    } 
    else if(totalPoint > -150) {
      let nextLifeImage = require('../resources/monkey.png');
      return {NEXTLIFEIMAGE: nextLifeImage, NAME: nextLife.MONKEY.NAME, EXPLAIN: nextLife.MONKEY.EXPLAIN};
    } 
    else if(totalPoint > -250) {
      let nextLifeImage = require('../resources/pig.png');
      return {NEXTLIFEIMAGE: nextLifeImage, NAME: nextLife.PIG.NAME, EXPLAIN: nextLife.PIG.EXPLAIN};
    } 
    else if(totalPoint > -350) {
      let nextLifeImage = require('../resources/bird.png');
      return {NEXTLIFEIMAGE: nextLifeImage, NAME: nextLife.BIRD.NAME, EXPLAIN: nextLife.BIRD.EXPLAIN};
    } 
    else if(totalPoint > -500){
      let nextLifeImage = require('../resources/snake.png');
      return {NEXTLIFEIMAGE: nextLifeImage, NAME: nextLife.SNAKE.NAME, EXPLAIN: nextLife.SNAKE.EXPLAIN};
    } 
    else {
      let nextLifeImage = require('../resources/mijinnko.png');
      return {NEXTLIFEIMAGE: nextLifeImage, NAME: nextLife.MIJINNKO.NAME, EXPLAIN: nextLife.MIJINNKO.EXPLAIN};
    }

  }

  render() {

    const { classes } = this.props;

    let totalPoint = this.calcTotalPoint();
    let nowNextLife = this.judgeNextLife(totalPoint);

    return (
      <div>
        <Grid container spacing={5}>
          <Grid item xs={12} />
          <Grid item xs={12} />
          
          {/* 来世の姿を表示 */}
          <Grid item xs={5}>
            <Typography variant="h5" component="h2" align="right">
              {componentLabelNames.NEXTLIFE}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="nextlife"
                  height="100"
                  image={nowNextLife.NEXTLIFEIMAGE}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {nowNextLife.NAME}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {nowNextLife.EXPLAIN}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <Typography className={classes.totalPointText} variant="h5" component="h2" align="left">
              {componentLabelNames.TOTALPOINT}{totalPoint}
            </Typography>
          </Grid>

          {/* メッセージ送信部 */}
          <Grid item xs={2} />
          <Grid item xs={7}>
            <TextField
              fullWidth
              id="message"
              label={componentLabelNames.SENDMESSAGE}
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
              {componentLabelNames.SENDBUTTON}
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

export default withRouter(withStyles(styles, { withTheme: true })(MainView));