<template>
  <div class="contents">
    <Sidenav :searchSubmit="handeSearchSubmit" />
    <div class="main"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Sidenav from "../components/Sidenav.vue";

export default defineComponent({
  name: "Home",
  components: {
    Sidenav,
  },
  setup() {
    const search = ref("");
    const handleSearchSubmit = () => {
      console.log(search);
    };

    return {
      handleSearchSubmit,
      search,
    };
  },
});
</script>

<style lang="scss">
.contents {
  background: black;
  width: 100%;
  height: 100%;
  opacity: 70%;
}
</style>
