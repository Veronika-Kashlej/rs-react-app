import { Component } from 'react';

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
        Test Error
      </button>
    );
  }
}
