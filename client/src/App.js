import ChatWindow from './components/ChatWindow/ChatWindow';
import React, { Component } from 'react';
import './App.css';
import ChatInput from './components/ChatInput/ChatInput';

window.WebSocket = window.WebSocket || window.MozWebSocket;

const connection = new WebSocket('ws://127.0.0.1:1337');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userColor: '',
      messagesList: []
    }
  }

  componentDidMount() {
    connection.onopen = () => {
      // connection is opened and ready to use
      const message = {
        time: (new Date()).getTime(),
        text: "Welcome to Chat, please enter your name"
      };

      this.addMessage('', message.text, '', message.time);
    };

    connection.onerror = function (error) {
      // an error occurred when sending/receiving data
    };

    connection.onmessage = (message) => {
      // try to decode json (I assume that each message
      // from server is json)
      let json;
      let data;
      try {
        json = JSON.parse(message.data);
        data = JSON.parse(json.data);
      } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ', message.data);
        return;
      }
      // handle incoming message
      if (json.type === 'color') {
        this.setState({ userColor: message.color });
      } else if (json.type === 'history') {
        data.forEach(message => {
          this.addMessage(message.author, message.text, message.color, new Date(message.time).getTime());
        })
      }
      else if (json.type === 'message') { // it's a single message
        this.addMessage(data.author, data.text, data.color, new Date(data.time).getTime());
      } else {
        console.log('Hmm..., I\'ve never seen JSON like this:', json);
      }
    };
  }

  sendMessage = (message) => {
    if (message) {
      connection.send(message);
    }
    if (this.state.userName.length === 0) {
      this.setState({ userName: message });
    }
  };

  addMessage = (author, text, color, time) => {
    const { messagesList } = this.state;
    const msg = { author, text, color, time, isByMe: (author === this.state.userName && this.state.userName.length > 0) };
    this.setState({ messagesList: [...messagesList, msg] });
  };

  render() {
    return (
      <div className="App">
        <ChatWindow messages={this.state.messagesList} userName={this.state.userName}
                    userColor={this.state.userColor} />
        <ChatInput onSendMessage={this.sendMessage} userName={this.state.userName} />
      </div>
    );
  }
}

export default App;
