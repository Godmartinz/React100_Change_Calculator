import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountDue: 0,
      amountReceived: 0,
      twenties: 0,
      tens: 0,
      fives: 0,
      dollars: 0,
      quarters: 0,
      dimes: 0,
      nickels: 0,
      pennies: 0,
      changeDue: 0,
      alertDefault: "alert alert-secondary text-center d-block",
      alertSuccess: "alert alert-success text-center d-none",
      alertDanger: "alert alert-danger text-center d-none"
    };
    this.handleChange = this.handleChange.bind(this);
    this.CalculateChange = this.CalculateChange.bind(this);
    this.handleEvent = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  // handleEvent(e) {
  //   e.preventdefault();
  //   this.CalculateChange();
  // }
  CalculateChange() {
    let amtD = parseFloat(Math.round(this.state.amountDue * 100) / 100).toFixed(
      2
    );
    let amtR = parseFloat(
      Math.round(this.state.amountReceived * 100) / 100
    ).toFixed(2);
    let change = amtR - amtD;
    this.setState({ changeDue: change.toFixed(2) });
    let twenties = Math.floor(change / 20.0);
    change = change % 20.0;
    let tens = Math.floor(change / 10.0);
    change = change % 10.0;
    let fives = Math.floor(change / 5.0);
    change = change % 5.0;
    let dollars = Math.floor(change / 1.0);
    change = change % 1.0;
    let quarters = Math.floor(change / 0.25);
    change = change % 0.25;
    let dimes = Math.floor(change / 0.1);
    change = change % 0.1;
    let nickels = Math.floor(change / 0.05);
    change = change % 0.05;
    let pennies = (change * 100).toFixed(0);
    if (amtR < amtD) {
      this.setState({
        alertDefault: "alert alert-secondary text-center d-none",
        alertSuccess: null,
        alertDanger: "alert alert-danger text-center"
      });
    } else if (amtR > amtD) {
      this.setState({
        twenties: twenties,
        tens: tens,
        fives: fives,
        dollars: dollars,
        quarters: quarters,
        dimes: dimes,
        nickels: nickels,
        pennies: pennies,
        alertDefault: "alert alert-secondary text-center d-none",
        alertSuccess: "alert alert-success text-center",
        alertDanger: null
      });
    }
    return null;
  }
  render() {
    const showSuccess = {
      display: this.state.alertSuccess ? "block" : "none"
    };
    const showDanger = {
      display: this.state.alertDanger ? "block" : "none"
    };
    const showDefault = {
      display: this.state.alertDefault ? "none" : "block"
    };
    return (
      <div className="container">
        <h1>Change Calculator</h1>

        <div className="row">
          <div className="col-sm-4">
            <div className="panel panel-default">
              <div className="panel-heading">Enter Information</div>
              <div className="panel-body">
                <div>
                  <label>How much is due?</label>
                  <input
                    className="input-sm col-sm-12"
                    type="number"
                    step="0.01"
                    name="amountDue"
                    value={this.state.amountDue}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
                <div>
                  <label>How much was received?</label>
                  <input
                    className="input-sm col-sm-12"
                    type="number"
                    step="0.01"
                    name="amountReceived"
                    value={this.state.amountReceived}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
              </div>
              <div className="panel-footer text-center">
                <button
                  className="btn btn-block btn-primary"
                  onClick={() => this.CalculateChange.bind(this)(this.state)}
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-8 well text-center">
            <div
              className={this.state.alertDefault}
              style={showDefault}
              role="alert"
            />
            <div
              className={this.state.alertSuccess}
              style={showSuccess}
              role="alert"
            >
              The total change due is ${this.state.changeDue}
            </div>
            <div
              className={this.state.alertDanger}
              style={showDanger}
              role="alert"
            >
              ${this.state.changeDue} is due from the customer.
            </div>
            <div className="row">
              <div className="col-sm-3">
                <div className="well square">
                  <label>Twenties</label>
                  <p className="change">{this.state.twenties}</p>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="well square">
                  <label>Tens</label>
                  <p className="change">{this.state.tens}</p>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="well square">
                  <label>Fives</label>
                  <p className="change">{this.state.fives}</p>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="well square">
                  <label>Ones</label>
                  <p className="change">{this.state.dollars}</p>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="well square">
                  <label>Quarters</label>
                  <p className="change">{this.state.quarters}</p>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="well square">
                  <label>Dimes</label>
                  <p className="change">{this.state.dimes}</p>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="well square">
                  <label>Nickels</label>
                  <p className="change">{this.state.nickels}</p>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="well square">
                  <label>Pennies</label>
                  <p className="change">{this.state.pennies}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
