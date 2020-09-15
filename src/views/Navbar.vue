<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">Reddit Clone</a>

      <button
        v-on:click="showNavbar"
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse navbar-menu"
        v-bind:class="{ show: show }"
        id="navbarNav"
      >
        <ul v-if="getIsLoggedIn" class="navbar-nav">
          <li class="nav-item">
            <img
              class="rounded mr-2"
              v-bind:src="getUser.image"
              alt="Profile"
              style="width: 41px;"
            />

            <span class="text-white">{{ getUser.name }}</span>
          </li>

          <li v-on:click="userLogout" class="nav-item">
            <a class="nav-link" href="#">Logout</a>
          </li>
        </ul>

        <ul v-else class="navbar-nav">
          <li v-on:click="userLogin" class="nav-item">
            <a class="nav-link" href="#">Login</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
/* eslint-disable */

import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    // Mendapatkan seluruh action dari store.

    ...mapActions("auth", ["userLogin", "userLogout"]),

    // Fungsi untuk menampilkan atau menyembunyikan navbar menu.

    showNavbar() {
      this.show = !this.show;
    },
  },
  computed: {
    // Mendapatkan seluruh getter dari store.

    ...mapGetters("auth", ["getUser", "getIsLoggedIn"]),
  },
};
</script>

<style>
.navbar-menu {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  justify-items: center;
}

@media only screen and (max-width: 991px) {
  .navbar-menu {
    justify-content: flex-start;
  }
}
</style>
