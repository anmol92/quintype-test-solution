import React, { Component } from 'react';
import './styles/App.css';
import 'font-awesome/css/font-awesome.min.css';
import TableItem from './tableItem';
import { SIZE } from './constants';
let removeDec;
class App extends Component {
  diamondPositions = [
    { r: Math.floor(Math.random() * SIZE), c: Math.floor(Math.random() * SIZE) }
  ];
  refItems = [];
  state = { gameOver: false, foundAllDiamond: false, score: SIZE * SIZE };
  componentWillMount() {
    while (this.diamondPositions.length < SIZE) {
      let r = Math.floor(Math.random() * SIZE);
      let c = Math.floor(Math.random() * SIZE);
      if (
        this.diamondPositions.findIndex(pos => pos.r === r && pos.c === c) ===
        -1
      ) {
        this.diamondPositions.push({ r, c });
      }
    }
  }
  _refreshPage() {
        window.location.reload();
  }
  _decrementCounter(row, col) {
    this.refItems.forEach(refItem => {
      if (refItem.row !== row && refItem.col !== col) {
        refItem.ref._resetCurrentTile();
      }
    });
    const dec = document.getElementById('decrease');
    dec.style = 'display:inline';
    clearTimeout(removeDec);
    removeDec = setTimeout(() => {
      dec.style = 'display:none';
    }, 500);
    this.setState({ score: this.state.score - 1 });
    if (this.state.score === 0) {
      this.setState({ gameOver: true });
      const prevScore = localStorage.getItem('highScore') || 0;
      if (prevScore < this.state.score)
        localStorage.setItem('highScore', this.state.score - 1);
    }
  }
  _removeRevealedDiamondFromSearchArray(row, col) {
    this.diamondPositions.splice(
      this.diamondPositions.findIndex(
        diamond => diamond.r === row && diamond.c === col
      ),
      1
    );
    if (this.diamondPositions.length === 0) {
      this.setState({ foundAllDiamond: true });
      const prevScore = localStorage.getItem('highScore') || 0;
      if (prevScore < this.state.score)
        localStorage.setItem('highScore', this.state.score - 1);
    }
  }
  _renderRowElements(row) {
    let rowElements = [];
    for (let i = 0; i < SIZE; i++) {
      rowElements.push(
        <td key={i + '' + row}>
          <TableItem
            ref={ref => {
              if (this.refItems.length < SIZE * SIZE)
                this.refItems.push({ row: row, col: i, ref });
            }}
            row={row}
            col={i}
            diamondPositions={this.diamondPositions}
            removeDiamondFromArray={() =>
              this._removeRevealedDiamondFromSearchArray(row, i)
            }
            decrementCounter={() => this._decrementCounter(row, i)}
          />
        </td>
      );
    }
    return rowElements;
  }
  _renderRows() {
    let row = [];
    for (let i = 0; i < SIZE; i++) {
      row.push(<tr key={i}>{this._renderRowElements(i)}</tr>);
    }
    return row;
  }
  _renderTable() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 row mt-20">
        <div className="offset-md-3 offset-xs-0 col-lg-5 col-md-5 col-sm-5 col-xs-12 table-board">
          <table>
            <tbody>{this._renderRows()}</tbody>
          </table>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 score-card">
          <div className="diamond-score-text">
            Your highScore: {localStorage.getItem('highScore') || 0}
          </div>
          <div className="diamond-score-text">
            Diamonds Left: {this.diamondPositions.length}
          </div>
          <div className="diamond-score-text">Your score: {this.state.score}</div>
          <div hidden={true} id={'decrease'}> -1 </div>
        </div>
      </div>
    );
  }
  _renderGameOver() {
    return (
      <div className="offset-md-4 col-md-4 game-over-content">
        <span className="game-over-text">
          {this.state.gameOver
            ? `Game Over`
            : `Congratulations! You have found all the diamonds.`}
        </span>
        <div className="diamond-score-text">Your score: {this.state.score}</div>
        <button className="subBtn" onClick = {this._refreshPage}>Try Again <i className="fa fa-refresh" aria-hidden="true"></i></button>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="headSection">
            <h3 style={{ textAlign: 'center' }}>Diamond Sweeper Application</h3>
          </div>
        </div>
        <div className="container-fluid">
          {this.state.gameOver || this.state.foundAllDiamond
            ? this._renderGameOver()
            : this._renderTable()}
        </div>
      </div>
    );
  }
}

export default App;
