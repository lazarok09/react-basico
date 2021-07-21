import { Component } from "react";
import "./button-style.css";

export class Button extends Component {
  render() {
    const { text, onClick, disabled} = this.props;
    return (
      <button
      disabled={disabled}
        onClick={
            onClick}
      >
        {text}
      </button>
    );
  }
}
