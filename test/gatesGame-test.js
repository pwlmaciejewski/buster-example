if (typeof module == "object" && typeof require == "function") {  
  var buster = require('buster');
  var GatesGame = require('../lib/gatesGame');
}

var testCase = buster.testCase('Game test case', {
  setUp: function () {
    var that = this;
    this.bareGame = Object.create(GatesGame);
    this.game = Object.create(GatesGame).initialize();
    this.nTimes = function (method) {
      return function () {
        var res = [];
        var args = Array.prototype.slice.call(arguments);
        var num = args.shift();
        for (var i = 0; i < num; i += 1) {
          res.push(this[method].apply(this, args));
        }
        return res;
      };
    };
  },

  'test reset': function () {
    this.bareGame.reset();
    assert.equals(this.bareGame.getPlayersGate(), -1);
    assert.equals(this.bareGame.getAwardGate(), -1);
    assert.equals(this.bareGame.getRejectedGates(), []);
  },

  'test setOptions': {
    setUp: function () {
      this.bareGame._setOptions({
        gatesCount: 5,
        decisionStrategy: 'dont change gate'
      });
    },

    'gated count': function () {
      assert.equals(this.bareGame.getGatesCount(), 5);      
    },

    'decision strategy': function () {
      assert.equals(this.bareGame.getDecisionStrategy(), 'dont change gate');
    }
  },

  'test initialization': {
    'returned type': function () {
      assert.equals(typeof this.game, 'object');
    }
  },

  'test reject gates': {
    'argument validation': function () {
      var that = this;
      assert.exception(function () {
        that.game.rejectGates(1);
      });      
    },

    'reject one gate': function () {
      this.game.rejectGates([1]);
      this.game.rejectGates([2]);
      this.game.rejectGates([1]);
      assert.equals(this.game.getRejectedGates(), [1, 2]);      
    },

    'reject many gates': function () {
      this.game.rejectGates([1, 2, 1]);
      assert.equals(this.game.getRejectedGates(), [1, 2]);            
    }
  },

  'test is gate rejected': {
    'rejected': function () {
      this.game.rejectGates([1]);
      assert(this.game.isGateRejected(1));
    },

    'not rejected': function () {
      this.game.rejectGates([1]);
      refute(this.game.isGateRejected(0));
    }
  },

  'test getRandomGate': {
    setUp: function () {
      this.getRandomGateNTimes = this.nTimes('getRandomGate');
    },

    'test lower bound': function () {
      var gates = this.getRandomGateNTimes.call(this.game, 100);
      assert.equals(gates.filter(function (gate) {
        return gate < 0;        
      }).length, 0);
    },

    'test upper bound': function () {
      var gates = this.getRandomGateNTimes.call(this.game, 100);
      var that = this.game;
      assert.equals(gates.filter(function (gate) {
        return gate >= that.getGatesCount();        
      }).length, 0);
    },

    'test rejection': function () {
      this.game.rejectGates([0]);
      var gates = this.getRandomGateNTimes.call(this.game, 100);
      var that = this.game;
      assert.equals(gates.filter(function (gate) {
        return gate === 0;        
      }).length, 0);
    }
  },

  'get random gate except': function  () {      
    var getRandomGateExceptNTimes = this.nTimes('getRandomGateExcept');
    assert.equals(getRandomGateExceptNTimes.call(this.game, 100, [1, 2]).filter(function(gate) {
      return gate === 1 || gate === 2;
    }).length, 0);
  },

  'test player makes decision': {
    setUp: function () {
      this.makeDecisionNTimes = this.nTimes('playerMakesDecision');
    },

    'change gate': function () {
      this.bareGame.initialize({
        decisionStrategy: 'change gate'
      });
      this.bareGame.setPlayersGate(2);
      assert.equals(this.makeDecisionNTimes.call(this.bareGame, 100).filter(function (gate) {
        return gate === 2;
      }).length, 0);
    },

    'dont change gate': function () {
      this.bareGame.initialize({
        decisionStrategy: 'dont change gate'
      });
      this.bareGame.setPlayersGate(2);
      assert.equals(this.makeDecisionNTimes.call(this.bareGame, 100).filter(function(gate) {
        return gate !== 2;
      }).length, 0);
    }
  },

  'get gates except': function () {
    assert.equals(this.game.getGatesExcept([1]), [0, 2]);
  },

  'test host rejects all but two': {
    setUp: function () {
      var that = this;
      this.hostRejectsAllButTwoNTimes = this.nTimes('hostRejectsAllButTwo');      
      this.sameGatesSetup = function () {
        that.game.setPlayersGate(1);
        that.game.setAwardGate(1);
      };
      this.differentGatesSetup = function () {
        that.game.setPlayersGate(0);
        that.game.setAwardGate(1);    
      };
    },

    'result array length': {
      'same gates': function () {
        this.sameGatesSetup();
        assert.equals(this.game.hostRejectsAllButTwo().length, 1);
      },

      'different gates': function () {
        this.differentGatesSetup();
        assert.equals(this.game.hostRejectsAllButTwo().length, 1);
      }
    },

    'different gates': function () {
      this.differentGatesSetup();
      assert.equals(this.hostRejectsAllButTwoNTimes.call(this.game, 100).filter(function(gates) {
        return gates.indexOf(0) !== -1 || gates.indexOf(1) !== -1;
      }).length, 0);      
    },

    'same gates': function () {
      this.sameGatesSetup();
      assert.equals(this.hostRejectsAllButTwoNTimes.call(this.game, 100).filter(function(gate) {
        return gate.indexOf(1) !== -1;
      }).length, 0);
    }
  },

  'test results': {
    setUp: function () {
      this.playNTimes = this.nTimes('play');
    },

    'change gate': function () {
      this.bareGame.initialize({
        decisionStrategy: 'change gate'
      });
      var results = this.playNTimes.call(this.bareGame, 1000);
      assert(results.filter(function (result) {
        return result === true;
      }).length > 600);
    },

    'do not change gate': function () {
      this.bareGame.initialize({
        decisionStrategy: 'dont change gate'
      });
      var results = this.playNTimes.call(this.bareGame, 10);
      assert(results.filter(function (result) {
        return result === true;
      }).length < 400);
    }
  }
});