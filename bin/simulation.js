#!/usr/bin/env node
var GatesGame = require('../lib/gatesGame');
var optimist = require('optimist')
  .string('strategy')
  .alias('s', 'strategy')
  .describe('strategy', 'Possible values: "change" or "dontChange"')
  .default('strategy', 'change')
  
  .string('gates')
  .alias('g', 'gates')
  .default('gates', 3)
  .describe('gates', 'Number of gates')
  
  .string('num')
  .alias('n', 'num')
  .default('num', 1000)
  .describe('num', 'Repeat count')

  .check(function (args) {
    if (args.strategy !== 'change' && args.strategy !== 'dontChange') {
      throw new Error('Invalid strategy "' + args.strategy + '"');
    }
  });
var argv = optimist.argv;

var game = Object.create(GatesGame).initialize({
  gatesCount: parseInt(argv.gates, 10),
  decisionStrategy: argv.strategy === 'change' ? 'change gate' : 'dont change gate'
});

var repeats = parseInt(argv.num, 10);

var results = [];
for (var i = 0; i < repeats; i += 1) {
  results.push(game.play());
};

var wins = results.filter(function (result) {
  return result;
}).length;

var loses  = results.filter(function (result) {
  return !result;
}).length;

var percents = wins / repeats * 100;

process.stdout.write(percents + '% (' + wins + '/' + loses + ')');
process.stdout.write(' after ' + repeats + ' repeats with ' + game.getGatesCount() + ' gates and "' + game.getDecisionStrategy() + '" strategy.');
console.log('');