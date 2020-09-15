<template>
  <v-layout>
    <v-flex class="text-center">
      <Login />
    </v-flex>
  </v-layout>
</template>

<script>
import Login from "~/components/Login.vue";

export default {
  auth: "guest",
  components: {
    Login,
  },
};
</script>

<style>
</style>