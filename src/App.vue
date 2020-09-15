<template>
  <div id="app">
    <Navbar />

    <div class="container mt-5 mb-5">
      <router-view />
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import Navbar from "@/views/Navbar.vue";

export default {
  data() {
    return {};
  },
  components: {
    Navbar
  }
};
</script>
