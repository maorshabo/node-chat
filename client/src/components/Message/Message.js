import React from 'react';
import PropTypes from 'prop-types';
import './message.style.css';
import format from 'date-fns/format'

const Message = (props) => {
  const msgDate = format(new Date(props.message.time), "HH:mm");
  const classname = `speech-bubble ${props.message.isByMe ? 'speech-bubble-left' : 'speech-bubble-right'}`;
  const author = props.message.author ? `${msgDate} - ${props.message.author}:` : msgDate;
  return (
    <div className={classname} style={{ backgroundColor: props.message.color }}>
      <span>{author}</span>
      <p>{props.message.text}</p>
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