import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './chatInput.style.css';

class ChatInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  onMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };

  onKeyDown = (event) => {
    if (event.charCode === 13) {
      this.sendMessage()
    }
  };

  sendMessage = () => {
    this.props.onSendMessage(this.state.message);
    this.setState({ message: '' });
  };

  render() {
    const placeholder = this.props.userName.length > 0 ? '' : 'Your name is...';
    return (
      <div className="chatInput">
        <input type="text" placeholder={placeholder} value={this.state.message} onKeyPress={this.onKeyDown} onChange={this.onMessageChange} />
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}

ChatInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  userName: PropTypes.string
};

export default ChatInput;