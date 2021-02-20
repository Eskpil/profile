<template>
  <div class="wrapper">
    <router-view> </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidenav from "./components/Sidenav.vue";

export default defineComponent({
  name: "App",
  components: {},
});
</script>

<style lang="scss">
:root {
  font-size: 16px;
  font-family: "Open Sans";
  --text-primary: #b6b6b6;
  --text-secondary: #ececec;
  --bg-primary: #23232e;
  --bg-secondary: #141418;
  --transition-speed: 600ms;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 90vh;
  width: 94vw;
  margin: 35px auto;
  // overflow-y: hidden;
  // overflow-x: hidden;
}

body {
  margin: 0;
  padding: 0;
  background-image: url("https://www.animalhi.com/thumbnails/detail/20181004/5bb667f1cb8c8.jpg");
  &:-webkit-scrollbar {
    width: 0.25rem;
  }
  &:-webkit-scrollbar-track {
    background: #1e1e24;
  }
  &:-webkit-scrollbar-thumb {
    background: #6649b8;
  }
}

.wrapper {
  height: 90vh;
  width: 94vw;
  margin: 35px auto;
}

@media screen and (max-width: 700px) {
  .wrapper {
    width: 100vw;
    height: 100vh;
    margin: 0 0 0 0;
    padding: 0 0 0 0;
  }
}

router-view {
  background: black;
}
</style>
