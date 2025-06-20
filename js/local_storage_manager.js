window.fakeStorage = {
  _data: {},

  setItem(id, val) {
    this._data[id] = String(val);
  },

  getItem(id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem(id) {
    delete this._data[id];
  },

  clear() {
    this._data = {};
  }
};

class LocalStorageManager {
  constructor() {
    this.bestScoreKey = "bestScore";
    this.gameStateKey = "gameState";
    this.storage = this.localStorageSupported() ? window.localStorage : window.fakeStorage;
  }

  localStorageSupported() {
    const testKey = "test";
    try {
      const storage = window.localStorage;
      storage.setItem(testKey, "1");
      storage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  // Best score getters/setters
  getBestScore() {
    return this.storage.getItem(this.bestScoreKey) || 0;
  }

  setBestScore(score) {
    this.storage.setItem(this.bestScoreKey, score);
  }

  // Game state getters/setters and clearing
  getGameState() {
    const stateJSON = this.storage.getItem(this.gameStateKey);
    return stateJSON ? JSON.parse(stateJSON) : null;
  }

  setGameState(gameState) {
    this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
  }

  clearGameState() {
    this.storage.removeItem(this.gameStateKey);
  }
}
