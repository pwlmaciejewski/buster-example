var config = module.exports;

config["Browser config"] = {
  env: "browser",
  rootPath: "../",
  sources: ['lib/gatesGame.js'],
  tests: ['test/*-test.js']
};

config["Server-side config"] = {
  env: "node",
  rootPath: "../",
  tests: ['test/*-test.js']
};