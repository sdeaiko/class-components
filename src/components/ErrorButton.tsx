import { Component } from "react";

export default class ErrorButton extends Component {
  state = { throwError: false };

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error("Что-то пошло не так!");
    }

    return <button onClick={this.handleClick}>Ошибка</button>;
  }
}
