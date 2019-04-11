import React, { Component } from 'react';
import './styles/tableItem.css';
import { diamond, arrow, question } from './assets';
import { SIZE } from './constants';
export default class TableItem extends Component {
  state = {
    pressed: false,
    isDiamond: false
  };
  _resetCurrentTile() {
    if (!this.state.isDiamond && this.state.pressed) {
      this.setState({ pressed: true });
    }
  }
  left = <img src={arrow} className="images img-responsive" alt="arrowL" />;
  right = <img src={arrow} className="images right img-responsive" alt="arrowR" />;
  up = <img src={arrow} className="images up img-responsive" alt="arrowU" />;
  down = <img src={arrow} className="images down img-responsive" alt="arrowD" />;
  render() {
    if (!this.state.pressed)
      return (
        <div
          className="squareBox"
          id={`div${this.props.row}${this.props.col}`}
          onClick={() => {
            document.getElementById(
              `div${this.props.row}${this.props.col}`
            ).className =
              'squareBox-rotate';
            this.props.decrementCounter();
            let isDiamond = false;
            let nearestNeighbour;
            if (
              this.props.diamondPositions.findIndex(
                pos => pos.r === this.props.row && pos.c === this.props.col
              ) !== -1
            ) {
              isDiamond = true;
            } else {
              let minR = SIZE;
              let minC = SIZE;
              this.props.diamondPositions.forEach(diamond => {
                if (
                  (Math.abs(diamond.r - this.props.row) +
                    Math.abs(diamond.c - this.props.col)) /
                    2 <
                  (minC + minR) / 2
                ) {
                  minR = Math.abs(diamond.r - this.props.row);
                  minC = Math.abs(diamond.c - this.props.col);
                  nearestNeighbour = diamond;
                }
              });
              if (
                Math.abs(nearestNeighbour.r - this.props.row) <
                  Math.abs(nearestNeighbour.c - this.props.col) ||
                nearestNeighbour.r === this.props.row
              ) {
                if (nearestNeighbour.c - this.props.col < 0)
                  this.setState({ nextDirection: this.right });
                else this.setState({ nextDirection: this.left });
              } else {
                if (nearestNeighbour.r - this.props.row > 0)
                  this.setState({ nextDirection: this.down });
                else this.setState({ nextDirection: this.up });
              }
            }
            if (isDiamond) {
              this.props.removeDiamondFromArray();
            } else {
              setTimeout(() => this._resetCurrentTile(), 4000);
            }
            setTimeout(
              () =>
                this.setState({ isDiamond }, () => {
                  this.setState({ pressed: true });
                  document.getElementById(
                    `div${this.props.row}${this.props.col}`
                  ).className =
                    'squareBox';
                }),
              700
            );
          }}
        >
          <img
            src={question}
            className="images img-responsive"
            alt="question"
            />
        </div>
      );
    if (this.state.isDiamond)
      return (
        <div className="display-box-value-diamond">
          <img src={diamond} className="images img-responsive" alt="diamond" />
        </div>
      );
    return <div className={`display-box-value`}>{this.state.nextDirection}</div>;
  }
}
