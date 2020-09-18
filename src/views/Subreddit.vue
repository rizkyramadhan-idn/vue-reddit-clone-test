<template>
  <div class="card">
    <div class="card-header">
      <span class="font-weight-bold">r/{{ $route.params.name }}</span>
      <button
        v-if="getIsLoggedIn"
        v-on:click="toggleForm"
        class="btn btn-primary btn-sm"
      >Toggle Form</button>
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

        <button type="submit" class="btn btn-primary float-right">Submit</button>
      </form>
    </div>

    <div v-else-if="!showForm && getIsLoggedIn" class="card-body">
      <span>Click toggle form button to show the form.</span>

      <hr />
    </div>

    <div class="container" v-bind:class="[getIsLoggedIn ? '' : 'mt-3']">
      <label class="font-weight-bold">Posts</label>

      <div v-for="post in getPosts" v-bind:key="post.id" class="card mb-3">
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
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      showForm: true,

      // Post baru yang akan dibuat.

      post: {
        title: "",
        description: "",
        url: ""
      }
    };
  },
  methods: {
    isImage(url) {
      return url.match(/(png|jpg|jpeg|gif)$/);
    },

    // Mengambil action untuk membuat post baru dan meng-inisialisasi
    // subreddit yang sedang dibuka oleh user.

    ...mapActions("subreddit", ["createNewPost", "initSubreddit", "initPosts"]),

    // Membuat post baru pada sebuah subreddit.
    // Contoh subreddit: r/memes.

    submitPost() {
      if (this.post.title && this.post.description && this.post.url) {
        this.createNewPost(this.post);

        this.post = {
          title: "",
          description: "",
          url: ""
        };
      } else {
        alert("Form can't be empty!");
      }
    },

    // Toggle untuk menampilkan / menyembunyikan form.

    toggleForm() {
      this.showForm = !this.showForm;
    }
  },
  computed: {
    // Mendapatkan subreddit yang sedang dibuka dan semua post yang ada di subreddit itu.

    ...mapGetters("subreddit", ["getSubreddit", "getPosts"]),
    ...mapGetters("auth", ["getIsLoggedIn"])
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
    }
  },
  mounted() {
    // Menginisialisasi subreddit yang sedang dibuka.
    // Jika user membuka subreddit r/memes, maka subredditnya adalah r/memes.

    this.initSubreddit(this.$route.params.name);
  }
};
</script>

<style>
.card-header {
  display: flex;
  justify-items: center;
  justify-content: space-between;
}
</style>
