import React from 'react';
import PropTypes from 'prop-types';

const Message = (props) => {
    return (
        <div style={{ color: props.message.color }}>
          <span>{props.message.time}</span>
          <p>{props.message.text}</p>
          <p>{props.message.author}</p>
        </div>
    );
};

Message.propTypes = {
  message: PropTypes.shape({
    time: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    author: PropTypes.string,
    color: PropTypes.string
  })
};

Message.defaultProps = {
    //myProp: <defaultValue>
};

export default Message;