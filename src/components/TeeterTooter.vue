<template>
  <div class="teeter-tooter">
    <div
      class="shape wood-shape"
      :style="{ transform: `rotate(${rotate / 2}deg)` }"
    >
      <Shapes
        v-for="(list, index) in mapShapes.reverse()"
        :key="index"
        :shape="list.class"
        :weight="list.weight"
        :style="{ left: `${list.left}px`, top: `${list.top}px` }"
      />
    </div>
    <div class="triangle"></div>
  </div>
</template>
<script>
import Shapes from "./Shapes";

export default {
  name: "TeeterTooter",
  components: {
    Shapes,
  },
  props: {
    mapShapes: {
      type: Array,
      require: true,
    },
    rotate: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss">
.teeter-tooter {
  position: absolute;
  bottom: 0;
  margin: 0 auto;
  left: 0;
  right: 0;
  max-width: 100%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}
.triangle {
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 70px solid blueviolet;
  .shape__weight {
    color: #fff;
    position: absolute;
    top: 50px;
    left: 20px;
  }
}
.wood-shape {
  width: 100%;
  height: 10px;
  background: rgb(150, 54, 54);
  transition: transform 0.2ms linear;
}
</style>
