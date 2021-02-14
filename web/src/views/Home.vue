<template>
  <div class="contents">
    <Sidenav />
    <div class="main">
      <div>Hello</div>
      <button>
        <a href="http://localhost:5000/api/auth">Authenticate</a>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidenav from "../components/Sidenav.vue";

export default defineComponent({
  name: "Home",
  components: {
    Sidenav,
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

.main {
  margin-left: 5rem;
  padding: 1rem;
}
</style>
