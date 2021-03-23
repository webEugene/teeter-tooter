<template>
  <div class="shape" :class="shape">
    <span class="shape__weight">{{ weight }}</span>
  </div>
</template>
<script>
export default {
  name: "Shapes",
  props: {
    weight: Number,
    shape: String,
  },
};
</script>
<style lang="scss" scoped>
.shape {
  position: relative;
  &.triangle {
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 50px solid #ccc;
    .shape__weight {
      color: #000;
      position: absolute;
      top: 20px;
      left: -8px;
    }
  }
  &.circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ccc;
    .shape__weight {
      color: #000;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &.square {
    width: 50px;
    height: 50px;
    background-color: #ccc;
    .shape__weight {
      color: #000;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
