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
          res.push(that.game[method].apply(that.game, args));
        }
        return res;
      };
    };
  },

  'test reset': function () {
    this.bareGame.reset();
    assert.equals(this.bareGame.getPlayerGate(), -1);
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

  'test reject gate': function () {
    this.game.rejectGate(1);
    this.game.rejectGate(2);
    this.game.rejectGate(1);
    assert.equals(this.game.getRejectedGates(), [1, 2]);
  },

  'test reject many gates': {
    'test argument validation': function () {
      assert.exception(function () {
        this.game.rejectManyGates(1);
      });      
    },

    'test rejection': function () {
      this.game.rejectManyGates([1, 2, 1]);
      assert.equals(this.game.getRejectedGates(), [1, 2]);      
    }
  },

  'test is gate rejected': {
    'rejected': function () {
      this.game.rejectGate(1);
      assert(this.game.isGateRejected(1));
    },

    'not rejected': function () {
      this.game.rejectGate(1);
      refute(this.game.isGateRejected(0));
    }
  },

  'test getRandomGate': {
    setUp: function () {
      this.getRandomGateNTimes = this.nTimes('getRandomGate');
    },

    'test lower bound': function () {
      var gates = this.getRandomGateNTimes(100);
      assert.equals(gates.filter(function (gate) {
        return gate < 0;        
      }).length, 0);
    },

    'test upper bound': function () {
      var gates = this.getRandomGateNTimes(100);
      var that = this.game;
      assert.equals(gates.filter(function (gate) {
        return gate >= that.getGatesCount();        
      }).length, 0);
    },

    'test rejection': function () {
      this.game.rejectGate(0);
      var gates = this.getRandomGateNTimes(100);
      var that = this.game;
      assert.equals(gates.filter(function (gate) {
        return gate === 0;        
      }).length, 0);
    }
  },

  'get random gate except': {
    setUp: function () {
      this.getRandomGateExceptNTimes = this.nTimes('getRandomGateExcept');
    },

    'test': function  () {      
      assert.equals(this.getRandomGateExceptNTimes(100, [1, 2]).filter(function(gate) {
        return gate === 1 || gate === 2;
      }).length, 0);
    }
  },

  '// decision': {
    'change gate': function () {
      this.bareGame.initialize({
        decisionStrategy: 'change gate'
      });
      this.bareGame.setPlayerGate(1);
      refute.equals(this.bareGame.makeDecision(), 1);
    }
  }
});