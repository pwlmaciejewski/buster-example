module.exports = {
  extends: "Main config",
  autoRun: false,
  environment: "browser",
  sources: ['amd/require.js', 'amd/app.js'],
  resources: ['lib/*.js'],
  tests: ['test/*-test.js']
};
