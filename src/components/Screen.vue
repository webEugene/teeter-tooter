<template>
  <div>
    <div class="screen">
      <div class="tt-screen">
        <div class="tt-screen__player" v-if="gameStarted">
          <Shapes
            ref="playerRef"
            :weight="this.player.weight"
            :shape="this.player.shape"
            :style="playerCoordinates"
          />
        </div>
        <div class="tt-screen__computer" v-if="gameStarted">
          <Shapes
            ref="computerRef"
            :shape="this.computer.shape"
            :weight="this.computer.weight"
            :style="computerCoordinates"
          />
        </div>
      </div>
      <TeeterTooter :map-shapes="mapShapes" :rotate="rotate" />
    </div>
    <footer class="footer">
      <button @click.prevent="startNewGame">New Game</button>
      <button @click.prevent="stopGame">Stop</button>
      <button @click.prevent="moveLeft">Left</button>
      <button @click.prevent="moveRight">Right</button>
    </footer>
  </div>
</template>
<script>
import Shapes from "./Shapes";
import TeeterTooter from "./TeeterTooter";
import * as consts from "../constants";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Screen",
  components: {
    Shapes,
    TeeterTooter,
  },
  data() {
    return {
      playerRef: "",
      computerRef: "",
    };
  },
  computed: {
    ...mapState({
      player: (state) => state.player,
      computer: (state) => state.computer,
      count: (state) => state.count,
      gameStarted: (state) => !!state.timeoutId,
    }),
    ...mapGetters({
      mapShapes: "mapShapes",
      rotate: "rotate",
    }),
    computerCoordinates() {
      return {
        left: `${this.computer.left}px`,
        top: `${this.count * consts.SHAPE_STEP}px`,
      };
    },
    playerCoordinates() {
      return {
        left: `${this.player.left}px`,
        top: `${this.count * consts.SHAPE_STEP}px`,
      };
    },
  },
  watch: {
    count(newVal) {
      if (newVal === 16) {
        this.compareWeight(this.player, this.computer);
      }
    },
    gameStarted(newVal) {
      if (newVal === true) {
        this.movePlayerTop;
      }
    },
    rotate(value) {
      if (value >= consts.MAX_BENDING || value <= consts.MIN_BENDING) {
        this.stopGame();
      }
    },
  },

  created() {
    window.addEventListener("keyup", this.keyboardCommand);
  },
  destroyed() {
    window.removeEventListener("keyup", this.keyboardCommand);
  },
  methods: {
    ...mapActions(["startGame", "moveLeft", "moveRight", "stopGame"]),
    keyboardCommand(e) {
      switch (e.keyCode) {
        case 37:
          this.$store.dispatch("moveLeft");
          break;
        case 39:
          this.moveRight();
          this.$store.dispatch("moveRight");
          break;
        case 32:
          // this.toggleStart();
          break;
        case 40:
          this.$store.dispatch("stopGame");
          break;
        case 13:
          this.$store.dispatch("startGame");

          break;
      }
    },
    startNewGame() {
      this.$store.dispatch("startGame");
    },
    stopGame() {
      this.$store.dispatch("stopGame");
    },
    compareWeight() {
      const playerData = {
        side: "left",
        class: this.$refs.playerRef.$el.classList[1],
        weight: Number.parseInt(this.$refs.playerRef.$el.innerText),
        left: Number.parseInt(this.$refs.playerRef.$el.style.left),
        top: -50,
      };
      const computerData = {
        side: "right",
        class: this.$refs.computerRef.$el.classList[1],
        weight: Number.parseInt(this.$refs.computerRef.$el.innerText),
        left: 300 + Number.parseInt(this.$refs.computerRef.$el.style.left),
        top: 0,
      };
      this.$store.dispatch("saveResult", { playerData, computerData });
    },
  },
};
</script>
<style lang="scss" scoped>
.screen {
  height: 430px;
}
.tt-screen {
  display: flex;
  &__player {
    width: 50%;
  }
  &__computer {
    width: 50%;
  }
}
.footer {
  background-color: darkseagreen;
  width: auto;
  padding: 10px;
  margin: 10px auto;
}
</style>
