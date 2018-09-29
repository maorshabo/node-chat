class Message {
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }

  toJSON() {
    return JSON.stringify({ type: this.type, data: JSON.stringify(this.data) });
  }
}

module.exports = Message;