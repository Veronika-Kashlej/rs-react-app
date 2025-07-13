import { Component } from 'react';
import './ErrorTestButton.css';

interface ErrorTestButtonProps {
  throwError: () => void;
}

export class ErrorTestButton extends Component<ErrorTestButtonProps> {
  handleClick = () => {
    this.props.throwError();
  };

  render() {
    return (
      <button className="error-test-button" onClick={this.props.throwError}>
        Do Not Press (or do)
      </button>
    );
  }
}
