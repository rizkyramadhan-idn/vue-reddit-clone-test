<template>
  <div class="card">
    <div class="card-header">
      <span class="font-weight-bold">r/{{ $route.params.name }}</span>
      <button
        v-if="getIsLoggedIn"
        v-on:click="toggleForm"
        class="btn btn-primary btn-sm"
      >
        Toggle Form
      </button>
    </div>

    <div v-if="showForm && getIsLoggedIn" class="card-body">
      <label class="font-weight-bold">Create a new post.</label>

      <hr />

      <form v-on:submit.prevent="submitPost">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            v-model="post.title"
            type="text"
            class="form-control"
            id="title"
            placeholder="Enter your post title"
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            v-model="post.description"
            class="form-control"
            id="description"
            rows="3"
            placeholder="Enter your post description"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="url">URL</label>
          <input
            v-model="post.url"
            type="text"
            class="form-control"
            id="url"
            placeholder="Enter your image url"
          />
        </div>

        <button type="submit" class="btn btn-primary float-right">
          Submit
        </button>
      </form>
    </div>

    <div v-else-if="!showForm && getIsLoggedIn" class="card-body">
      <span>Click toggle form button to show the form.</span>

      <hr />
    </div>

    <div class="container" v-bind:class="[getIsLoggedIn ? '' : 'mt-3']">
      <form class="mb-3">
        <label class="font-weight-bold">Search</label>

        <div class="form-group">
          <input
            v-model="searchPost"
            type="text"
            class="form-control"
            id="search"
            placeholder="Search ..."
          />
        </div>
      </form>

      <label class="font-weight-bold">Posts</label>

      <div v-if="getPosts.length > 0 && getUsers.length > 0">
        <div
          v-for="post in filteredPosts"
          v-bind:key="post.id"
          class="card mb-3"
        >
          <div class="row no-gutters">
            <div v-if="isImage(post.url)" class="col-md-4">
              <img
                v-bind:src="post.url"
                class="img-fluid"
                alt="Vue js"
                style="width: 100%; height: 100%; object-fit: cover;"
              />
            </div>

            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title" v-if="post.url">
                  <a v-bind:href="post.url">{{ post.title }}</a>
                </h5>

                <h5 class="card-title" v-else>{{ post.title }}</h5>

                <p class="card-text">{{ post.description }}</p>

                <img
                  v-bind:src="getUserById[post.user_id].image"
                  class="img-thumbnail"
                  style="width: 50px;"
                />

                <p class="card-text">
                  <small class="text-muted">{{
                    getUserById[post.user_id].name
                  }}</small>
                </p>

                <p class="card-text">
                  <small class="text-muted">
                    Created at {{ getCreatedAt(post.created_at.seconds) }}
                  </small>
                </p>

                <span>
                  <router-link
                    v-bind:to="{
                      name: 'Post',
                      params: {
                        name: $route.params.name,
                        post_id: post.id,
                      },
                    }"
                    class="btn btn-primary btn-sm mt-2"
                    >View Post</router-link
                  >
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <span>Post is empty ...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      searchPost: "",
      showForm: true,

      // Post baru yang akan dibuat.

      post: {
        title: "",
        description: "",
        url: "",
      },
    };
  },
  methods: {
    // Mengecek apakah url yang diinputkan mengandung png, jpg, jpeg gif atau tidak

    isImage(url) {
      return url.match(/(png|jpg|jpeg|gif)$/);
    },

    // Mengambil action untuk membuat post baru dan meng-inisialisasi
    // subreddit yang sedang dibuka oleh user.

    ...mapActions("subreddit", ["createNewPost", "initSubreddit", "initPosts"]),
    ...mapActions("users", ["initUsers"]),

    // Membuat post baru pada sebuah subreddit.
    // Contoh subreddit: r/memes.

    submitPost() {
      if (this.post.title && this.post.description && this.post.url) {
        this.createNewPost(this.post);

        this.post = {
          title: "",
          description: "",
          url: "",
        };
      } else {
        alert("Form can't be empty!");
      }
    },

    // Toggle untuk menampilkan / menyembunyikan form.

    toggleForm() {
      this.showForm = !this.showForm;
    },

    // Mendapatkan waktu dari pembuatan post.

    getCreatedAt(created_at) {
      const date = new Date();

      date.setTime(created_at * 1000);

      const month = {
        0: "Januari",
        1: "Februari",
        2: "Maret",
        3: "April",
        4: "Mei",
        5: "Juni",
        6: "Juli",
        7: "Agustus",
        8: "September",
        9: "Oktober",
        10: "November",
        11: "Desember",
      };

      return `${date.getDate()} ${
        month[date.getMonth()]
      } ${date.getFullYear()}`;
    },
  },
  computed: {
    // Mendapatkan subreddit yang sedang dibuka dan semua post yang ada di subreddit itu.

    ...mapGetters("subreddit", ["getSubreddit", "getPosts"]),
    ...mapGetters("auth", ["getIsLoggedIn"]),
    ...mapGetters("users", ["getUserById", "getUsers"]),

    // Filter post yang sedang dicari / search.

    filteredPosts() {
      if (this.searchPost) {
        const regexp = new RegExp(this.searchPost, "gi");

        return this.getPosts.filter((post) => {
          return (post.title + post.description).match(regexp);
        });
      }

      return this.getPosts;
    },
  },
  watch: {
    // Setiap kali user membuka subreddit lain, maka ambil data mengenai subreddit tersebut.

    "$route.params.name": function() {
      this.initSubreddit(this.$route.params.name);
    },

    // Setiap kali subreddit berubah, ambil semua post pada subreddit itu.

    getSubreddit() {
      if (this.getSubreddit.id) {
        this.initPosts(this.getSubreddit.id);
      }
    },
  },
  mounted() {
    // Inisialisasi user yang ada di database.

    this.initUsers();

    // Menginisialisasi subreddit yang sedang dibuka.
    // Jika user membuka subreddit r/memes, maka subredditnya adalah r/memes.

    this.initSubreddit(this.$route.params.name);
  },
};
</script>

<style>
.card-header {
  display: flex;
  justify-items: center;
  justify-content: space-between;
}
</style>
