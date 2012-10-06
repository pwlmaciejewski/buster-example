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
      this._playersGate = -1;
      this._rejectedGates = [];
    },

    getAwardGate: function () {
      return this._awardGate;
    },

    setAwardGate: function (gate) {
      this._awardGate = gate;
    },

    getPlayersGate: function () {
      return this._playersGate;
    },

    setPlayersGate: function (gate) {
      this._playersGate = gate;
    },

    getGatesCount: function () {
      return this._gatesCount;
    },

    getDecisionStrategy: function () {
      return this._decisionStrategy;
    },

    getRejectedGates: function () {
      return this._rejectedGates.slice();
    },

    setRejectedGates: function (gates) {
      this._rejectedGates = gates;
    },

    getRandomGate: function () {
      var gate = Math.round(Math.random() * (this.getGatesCount() - 1));
      return this.isGateRejected(gate) ? this.getRandomGate() : gate;
    },

    getRandomGateExcept: function (gates) {
      var rejectedGates = this.getRejectedGates();
      this.rejectGates(gates);
      var gate = this.getRandomGate();
      this.setRejectedGates(rejectedGates);
      return gate;
    },

    getGates: function () {
      var gates = [];
      for (var i = 0; i < this.getGatesCount(); i += 1) {
        gates.push(i);
      }
      return gates;
    },

    getGatesExcept: function (gates) {
      var res = [];
      this.getGates().forEach(function (gate) {
        if (gates.indexOf(gate) === -1) {
          res.push(gate);
        }
      });
      return res;
    },

    rejectGates: function (gates) {
      var that = this;
      if (typeof gates !== 'object' || !('length' in gates)) {
        throw new Error('Gates doesnt look like an array');
      }
      gates.forEach(function (gate) {
        that.rejectGate(gate);
      });
    },

    rejectGate: function (gate) {
      if (this._rejectedGates.indexOf(gate) === -1) {
        this._rejectedGates.push(gate);
      }
    },

    isGateRejected: function (gate) {
      return this.getRejectedGates().indexOf(gate) !== -1;
    },

    playerChangesGate: function () {
      if (this.getDecisionStrategy() === 'change gate') {
        return this.getRandomGateExcept([this.getPlayersGate()]);
      } else {
        return this.getDecisionStrategy();
      }
    },

    hostRejectsAllButTwo: function () {
      if (this.getAwardGate() === this.getPlayersGate()) {
        return this.getGatesExcept([this.getAwardGate(), this.getRandomGateExcept([this.getAwardGate()])]);
      } else {
        return this.getGatesExcept([this.getAwardGate(), this.getPlayersGate()]);        
      }
    }
  };

  if (typeof exports !== 'undefined') {
    module.exports = GatesGame;    
  } else {
    window.GatesGame = GatesGame;
  }
})();
