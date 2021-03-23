<template>
  <div id="app">
    <Screen />
  </div>
</template>

<script>
import Screen from "./components/Screen";

export default {
  name: "App",
  components: {
    Screen,
  },
};
</script>
<style lang="scss">
#app {
  border: 2px solid #000;
  max-width: 600px;
  height: 430px;
  margin: 0 auto;
  position: relative;
}
</style>
