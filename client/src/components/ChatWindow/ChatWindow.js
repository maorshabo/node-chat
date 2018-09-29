import React from 'react';
import PropTypes from 'prop-types';
import Message from '../Message/Message';
import './chatWindow.style.css';

const ChatWindow = (props) => {
  return (
    <div className="chatWindow">
      {props.messages.map((message, key) => <Message message={message} key={key} />)}
    </div>
  );
};

ChatWindow.propTypes = {
  messages: PropTypes.array.isRequired
};

export default ChatWindow;