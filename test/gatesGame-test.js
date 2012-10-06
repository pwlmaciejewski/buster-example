buster.testCase('Game test case', {
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
    var obj = {};
    GatesGame.reset.call(obj);
    assert.equals(obj._playerGate, -1);
    assert.equals(obj._awardGate, -1);
    assert.equals(obj._rejectedGates, []);
  }
});
