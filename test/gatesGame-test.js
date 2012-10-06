var testCase = buster.testCase('Game test case', {
  setUp: function () {
    this.game = Object.create(GatesGame).initialize();
  },

  'test reset': function () {
    var game = Object.create(GatesGame);
    game.reset();
    assert.equals(game.getPlayerGate(), -1);
    assert.equals(game.getAwardGate(), -1);
    assert.equals(game.getRejectedGates(), []);
  },

  'test setOptions': {
    setUp: function () {
      this.game = Object.create(GatesGame);
      this.game._setOptions({
        gatesCount: 5,
        decisionStrategy: 'dont change gate'
      });
    },

    'gated count': function () {
      assert.equals(this.game.getGatesCount(), 5);      
    },

    'decision strategy': function () {
      assert.equals(this.game.getDecisionStrategy(), 'dont change gate');
    }
  },

  'test initialization': {
    'returned type': function () {
      assert.equals(typeof Object.create(GatesGame).initialize(), 'object');
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
      var that = this;

      this.getRandomGateManyTimes = function (num) {
        var res = [];
        for (var i = 0; i < num; i += 1) {
          res.push(that.game.getRandomGate());
        }
        return res;
      };
    },

    'test lower bound': function () {
      var gates = this.getRandomGateManyTimes(100);
      assert.equals(gates.filter(function (gate) {
        return gate < 0;        
      }).length, 0);
    },

    'test upper bound': function () {
      var gates = this.getRandomGateManyTimes(100);
      var that = this.game;
      assert.equals(gates.filter(function (gate) {
        return gate >= that.getGatesCount();        
      }).length, 0);
    },

    'test rejection': function () {
      this.game.rejectGate(0);
      var gates = this.getRandomGateManyTimes(100);
      var that = this.game;
      assert.equals(gates.filter(function (gate) {
        return gate === 0;        
      }).length, 0);
    }
  },

  decision: {
    '// change': function () {
      var game = Object.create(GatesGame).initialize();
    }
  }
});