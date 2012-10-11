module.exports = { 
  "Main config": {
    rootPath: __dirname + "/../../"
  },
  //"Browser tests": require('./browser'),
  "Server-side tests": require('./node'),
  "AMD tests": require('./amd')
}
