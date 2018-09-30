import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Message from '../Message/Message';
import './chatWindow.style.css';

class ChatWindow extends PureComponent {
  constructor(props) {
    super(props);
    this.chatRef = React.createRef();
  }

  scrollToBottom() {
    const domNode = ReactDOM.findDOMNode(this.chatRef.current);
    domNode.scrollTop = this.chatRef.current.clientHeight;
  }

  componentDidUpdate() {
    if (this.chatRef.current) {
      this.scrollToBottom();
    }
  }

  render() {
    return (
      <div className="chatWindow">
        <div ref={this.chatRef} style={{ display: 'flex', flexDirection: 'column' }}>
          {this.props.messages.map((message, key) => <Message message={message} key={key} />)}
        </div>
      </div>
    );
  }
}

ChatWindow.propTypes = {
  messages: PropTypes.array.isRequired
};

export default ChatWindow;