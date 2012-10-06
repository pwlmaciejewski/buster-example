(function () {
  var GatesGame = {
    initialize: function (numberOfGates) {
      if (!numberOfGates) {
        throw new Error('You must pass number of arguments to initialize() method');
      }
      this._numberOfGates = numberOfGates;
      this.reset();
      return this;
    },

    reset: function () {
      this._awardGate = -1;
      this._playerGate = -1;
      this._rejectedGates = [];
    },

    getAwardGate: function () {
      return this._awardGate;
    },

    getPlayerGate: function () {
      return this._playerGate;
    },

    getNumberOfGates: function () {
      return this._numberOfGates;
    },

    getRandomGate: function () {
      var gate = Math.round(Math.random() * (this.getNumberOfGates() - 1));
      return gate;
    },

    rejectGate: function (gate) {
      if (this._rejectedGates.indexOf(gate) === -1) {
        this._rejectedGates.push(gate);
      }
    },

    rejectManyGates: function (gates) {
      var that = this;
      if (!('length' in gates)) {
        throw new Error('Gates doesnt look like an array');
      }
      gates.forEach(function (gate) {
        that.rejectGate(gate);
      });
    },

    getRejectedGates: function () {
      return this._rejectedGates;
    }

  };

  if (typeof exports !== 'undefined') {
    module.exports = GatesGame;    
  } else {
    window.GatesGame = GatesGame;
  }
})();
