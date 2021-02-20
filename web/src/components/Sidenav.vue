<template>
  <nav class="navbar">
    <div class="contents">
      <div v-if="!fetching">
        <img
          v-if="data.me"
          class="avatar"
          :src="
            `https://cdn.discordapp.com/avatars/${data.me.id}/${data.me.avatar}.png`
          "
          :alt="`${data.me.username}'s avatar`"
        />
      </div>
      <router-link to="/" class="link">Home</router-link>
      <router-link to="/about" class="link">About</router-link>
      <router-link to="/projects" class="link">Projects</router-link>
      <router-link to="/store" class="link">Store</router-link>
      <div v-if="path === `/store` || path === `/store/:id`" class="search">
        <form @submit.prevent="onSubmit()" class="form" @input="handleChange()">
          <input v-model="search" name="Search" placeholder="Search" />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { gql, useQuery } from "@urql/vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Navbar",
  props: {
    searchSubmit: Function,
  },
  setup() {
    const search = ref("");

    const onSubmit = () => {
      console.log("Fitte fean ", search);
      search.value = "";
    };

    const handleChange = () => {
      console.log(search);
    };

    const result = useQuery({
      query: gql`
        {
          me {
            id
            username
            email
            avatar
            createdAt
            updatedAt
          }
        }
      `,
    });

    const route = useRoute();

    if (result.fetching) {
      console.log("Loading");
    } else if (result.data) {
      console.log(result.data);
    }

    return {
      fetching: result.fetching,
      data: result.data,
      error: result.error,
      path: route.path,
      handleChange,
      onSubmit,
      search,
    };
  },
});
</script>

<style lang="scss" scoped>
nav {
  width: 94vw;
  height: 4rem;
  .contents {
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    .avatar {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
    .link {
      color: white;
      &:hover {
        cursor: pointer;
        color: white;
      }
    }
  }
  .search {
    width: 20%;
    background: #4a5568;
    .form {
      width: 100%;
    }
  }
}
</style>
