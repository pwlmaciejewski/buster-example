(function () {
  var GatesGame = {
    _defaultOptions : {
      gatesCount: 3,
      decisionStrategy: 'change gate'
    },

    _setOptions: function (options) {
      for (var p in this._defaultOptions) {
        if (this._defaultOptions.hasOwnProperty(p)) {
          this['_' + p] = p in options ? options[p] : this._defaultOptions[p];
        }
      }
    },

    initialize: function (options) {
      this.reset();
      this._setOptions(options || {});
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

    getGatesCount: function () {
      return this._gatesCount;
    },

    getDecisionStrategy: function () {
      return this._decisionStrategy;
    },

    getRejectedGates: function () {
      return this._rejectedGates;
    },

    getRandomGate: function () {
      var gate = Math.round(Math.random() * (this.getGatesCount() - 1));
      return this.isGateRejected(gate) ? this.getRandomGate() : gate;
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

    isGateRejected: function (gate) {
      return this.getRejectedGates().indexOf(gate) !== -1;
    }
  };

  if (typeof exports !== 'undefined') {
    module.exports = GatesGame;    
  } else {
    window.GatesGame = GatesGame;
  }
})();
