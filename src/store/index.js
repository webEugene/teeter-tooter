import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import * as consts from "../constants";

function getRandomShape() {
  const shapes = [consts.SQUARE, consts.CIRCLE, consts.TRIANGLE];
  return shapes[Math.floor(Math.random() * shapes.length)];
}

function getRandomWeight() {
  return Math.floor(Math.random() * 10) + 1;
}

function getRandomLeftCoordinate() {
  return Math.floor(Math.random() * 250);
}

export default new Vuex.Store({
  state: {
    timeoutId: "",
    isPaused: true,
    count: 0,
    playerPower: 0,
    computerPower: 0,
    player: {
      shape: getRandomShape(),
      weight: getRandomWeight(),
      left: 0,
      top: 0,
    },
    computer: {
      shape: getRandomShape(),
      weight: getRandomWeight(),
      left: getRandomLeftCoordinate(),
      top: 0,
      power: 0,
    },
    saveResult: {
      player: {
        info: [],
      },
      computer: {
        info: [],
      },
    },
  },
  actions: {
    startGame({ commit, dispatch }) {
      const timeout = setInterval(() => {
        dispatch("nextStep");
      }, 500);
      commit("SET_TIMEOUT", timeout);
      dispatch("nextStep");
    },

    nextStep({ state, commit }) {
      if (!state.timeoutId) {
        return;
      }
      if (state.timeoutId === 16) {
        commit("SET_TIMEOUT", null);
      }
      commit("INCREASE_COUNT");
    },

    saveResult({ commit }, data) {
      commit("SAVE_RESULTS", data);
      commit("NEW_SHAPES");
    },

    moveLeft({ commit, state }) {
      if (!state.timeoutId) return;
      commit("MOVE_LEFT");
    },

    moveRight({ commit, state }) {
      if (!state.timeoutId) {
        return;
      }
      commit("MOVE_RIGHT");
    },

    stopGame({ commit }) {
      commit("SET_TIMEOUT", null);
    },
  },
  mutations: {
    INCREASE_COUNT(state) {
      state.count += 1;
    },

    TOGGLE_PAUSE(state) {
      state.isPaused = !state.isPaused;
    },

    SET_TIMEOUT(state, value) {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
      state.timeoutId = value;
      state.count = 0;
      state.playerPower = 0;
      state.computerPower = 0;
      state.player = {
        shape: getRandomShape(),
        weight: getRandomWeight(),
        left: 0,
        top: 0,
      };
      state.computer = {
        shape: getRandomShape(),
        weight: getRandomWeight(),
        left: getRandomLeftCoordinate(),
        top: 0,
      };
      state.saveResult = {
        player: {
          info: [],
        },
        computer: {
          info: [],
        },
      };
    },

    NEW_SHAPES(state) {
      state.count = 0;
      state.player = {
        shape: getRandomShape(),
        weight: getRandomWeight(),
        left: 0,
        top: 0,
      };
      state.computer = {
        shape: getRandomShape(),
        weight: getRandomWeight(),
        left: getRandomLeftCoordinate(),
        top: 0,
      };
    },

    SAVE_RESULTS(state, payload) {
      const { playerData, computerData } = payload;
      const saveResult = state.saveResult;
      state.playerPower += playerData.weight;
      state.computerPower += computerData.weight;
      saveResult.player.info.push(playerData);
      saveResult.computer.info.push(computerData);
    },

    MOVE_RIGHT(state) {
      state.player.left += consts.SHAPE_STEP;
      if (state.player.left >= 240) {
        state.player.left = 240;
      }
    },

    MOVE_LEFT(state) {
      state.player.left -= consts.SHAPE_STEP;
      if (Math.sign(state.player.left) === -1) {
        state.player.left = 0;
      }
    },
  },

  getters: {
    mapShapes(state) {
      const saveResult = state.saveResult;
      const playerData = saveResult.player.info;
      const computerData = saveResult.computer.info;

      if (!playerData.length || !computerData.length) {
        return [];
      }

      return playerData.concat(computerData);
    },
    rotate(state) {
      if (state.playerPower === state.computerPower) return 0;

      const inFavorPlayer = state.playerPower > state.computerPower;

      const difference = Math.abs(state.playerPower - state.computerPower);
      if (difference > consts.MAX_POWER) {
        return inFavorPlayer ? consts.MIN_BENDING - 1 : consts.MAX_BENDING + 1;
      }

      return (
        (consts.MAX_BENDING / consts.MAX_POWER) *
        difference *
        (inFavorPlayer ? -1 : 1)
      );
    },
  },
});
