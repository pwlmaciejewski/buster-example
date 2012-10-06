var testCase = buster.testCase('Game test case', {
  setUp: function () {
    this.gatesGame = Object.create(GatesGame).initialize(3);
  },

  'test initialization numberOfGates argument': function () {
    assert.exception(function () {
      Object.create(GatesGame).initialize();
    });

    refute.exception(function () {
      Object.create(GatesGame).initialize(3);
    });

    assert.equals(Object.create(GatesGame).initialize(5)._numberOfGates, 5);
  },

  'test initialization type': function () {
    assert.equals(typeof Object.create(GatesGame).initialize(3), 'object');
  },

  'test reset': function () {
    var game = Object.create(GatesGame);
    game.reset();
    assert.equals(game.getPlayerGate(), -1);
    assert.equals(game.getAwardGate(), -1);
    assert.equals(game.getRejectedGates(), []);
  },

  'test reject gate': function () {
    this.gatesGame.rejectGate(1);
    this.gatesGame.rejectGate(2);
    this.gatesGame.rejectGate(1);
    assert.equals(this.gatesGame.getRejectedGates(), [1, 2]);
  },

  'test reject many gates': {
    'test argument validation': function () {
      assert.exception(function () {
        this.gatesGame.rejectManyGates(1);
      });      
    },

    'test rejection': function () {
      this.gatesGame.rejectManyGates([1, 2, 1]);
      assert.equals(this.gatesGame.getRejectedGates(), [1, 2]);      
    }
  },

  'test is gate rejected': {
    'rejected': function () {
      this.gatesGame.rejectGate(1);
      assert(this.gatesGame.isGateRejected(1));
    },

    'not rejected': function () {
      this.gatesGame.rejectGate(1);
      refute(this.gatesGame.isGateRejected(0));
    }
  },

  'test getRandomGate': {
    setUp: function () {
      var that = this;

      this.getRandomGateManyTimes = function (num) {
        var res = [];
        for (var i = 0; i < num; i += 1) {
          res.push(that.gatesGame.getRandomGate());
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
      var that = this.gatesGame;
      assert.equals(gates.filter(function (gate) {
        return gate >= that.getNumberOfGates();        
      }).length, 0);
    },

    'test rejection': function () {
      this.gatesGame.rejectGate(0);
      var gates = this.getRandomGateManyTimes(100);
      var that = this.gatesGame;
      assert.equals(gates.filter(function (gate) {
        return gate === 0;        
      }).length, 0);
    }
  }
});