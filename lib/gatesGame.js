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
    }
  };

  if (typeof exports !== 'undefined') {
    module.exports = GatesGame;    
  } else {
    window.GatesGame = GatesGame;
  }
})();
