import React from 'react';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: '',
      num2: '',
      result: 0,
    };
    this.setNum1 = this.setNum1.bind(this);
    this.setNum2 = this.setNum2.bind(this);
    this.add = this.add.bind(this);
    this.multiply = this.multiply.bind(this);
    this.substract = this.substract.bind(this);
    this.divide = this.divide.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  setNum1(event) {
    event.preventDefault();
    this.setState({ num1: event.currentTarget.value });
  }

  setNum2(event) {
    event.preventDefault();
    this.setState({ num2: event.currentTarget.value });
  }

  add(event) {
    event.preventDefault();
    this.setState({ 
      result: (parseInt(this.state.num1, 10)
      + parseInt(this.state.num2, 10)),
    });
  }

  substract(event) {
    event.preventDefault();
    this.setState({
      result: (parseInt(this.state.num1, 10)
        - parseInt(this.state.num2, 10)),
    });
  }

  divide(event) {
    event.preventDefault();
    this.setState({
      result: (parseInt(this.state.num1, 10)
        / parseInt(this.state.num2, 10)),
    });
  }

  multiply(event) {
    event.preventDefault();
    this.setState({
      result: (parseInt(this.state.num1, 10)
        * parseInt(this.state.num2, 10)),
    });
  }

  clearFields(event) {
    event.preventDefault();
    this.setState({
      num1: '',
      num2: '',
      result: 0,
    });
  }

  render() {
    const { num1, num2, result } = this.state;
    return (
      <div>
        <h1>{ result }</h1>
        <label htmlFor="num1"> Num 1:
          <input type="text" id="num1" onChange={this.setNum1} value={num1} />
        </label>
        <label htmlFor="num2"> Num 2:
          <input type="text" id="num2" onChange={this.setNum2} value={num2} />
        </label>
        <button onClick={this.clearFields}>Clear</button><br />
        <button onClick={this.add}>+</button>
        <button onClick={this.substract}>-</button>
        <button onClick={this.multiply}>*</button>
        <button onClick={this.divide}>/</button>
      </div>
    );
  }
}

export default Calculator;
