function log(message) {
  return console.log(`${new Date()} - ${message}`);
}

module.exports = log;