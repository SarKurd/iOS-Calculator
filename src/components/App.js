import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
import "../styles/components/App.scss";

class App extends Component {
  state = {
    result: 0
  };

  handleCalc = value => {
    switch (value) {
      case "0":
        this.setState({
          result: this.state.result === "" ? "" : this.state.result + 0
        });
        break;
      case "=":
        this.setState({
          result: `${eval(this.state.result)}`
        });
        break;
      case "ac":
        this.setState({
          result: 0
        });
        break;
      case "invert":
        this.setState({
          result: -this.state.result
        });
        break;
      case "x":
        this.setState({
          result: `${this.state.result}*`
        });
        break;
      default:
        this.setState({
          result: this.state.result + value
        });
    }
  };
  render() {
    return (
      <div id="app">
        <div className="container--result">
          <div className="result">{this.state.result}</div>
        </div>
        <div className="container--keys">
          <div
            className="key key--gray-medium"
            onClick={() => this.handleCalc("ac")}
          >
            AC
          </div>
          <div
            className="key key--gray-medium"
            onClick={() => this.handleCalc("invert")}
          >
            +/-
          </div>
          <div
            className="key key--gray-medium"
            onClick={() => this.handleCalc("%")}
          >
            %
          </div>
          <div className="key key--orange" onClick={() => this.handleCalc("/")}>
            /
          </div>
          <div className="key" onClick={() => this.handleCalc(7)}>
            7
          </div>
          <div className="key" onClick={() => this.handleCalc(8)}>
            8
          </div>
          <div className="key" onClick={() => this.handleCalc(9)}>
            9
          </div>
          <div className="key key--orange" onClick={() => this.handleCalc("x")}>
            x
          </div>
          <div className="key" onClick={() => this.handleCalc(4)}>
            4
          </div>
          <div className="key" onClick={() => this.handleCalc(5)}>
            5
          </div>
          <div className="key" onClick={() => this.handleCalc(6)}>
            6
          </div>
          <div className="key key--orange" onClick={() => this.handleCalc("-")}>
            -
          </div>
          <div className="key" onClick={() => this.handleCalc(1)}>
            1
          </div>
          <div className="key" onClick={() => this.handleCalc(2)}>
            2
          </div>
          <div className="key" onClick={() => this.handleCalc(3)}>
            3
          </div>
          <div className="key key--orange" onClick={() => this.handleCalc("+")}>
            +
          </div>
          <div className="key key--big" onClick={() => this.handleCalc(0)}>
            0
          </div>
          <div className="key" onClick={() => this.handleCalc(".")}>
            .
          </div>
          <div className="key key--orange" onClick={() => this.handleCalc("=")}>
            =
          </div>
        </div>
      </div>
    );
  }
}
export default hot(App);
