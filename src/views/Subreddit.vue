<template>
  <div class="card">
    <div class="card-header">r/{{ $route.params.name }}</div>

    <div class="card-body">
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

    <pre>
      {{ getPosts }}
    </pre>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      // Post baru yang akan dibuat.

      post: {
        title: "",
        description: "",
        url: ""
      }
    };
  },
  methods: {
    // Mengambil action untuk membuat post baru dan meng-inisialisasi
    // subreddit yang sedang dibuka oleh user.

    ...mapActions("subreddit", ["createNewPost", "initSubreddit", "initPosts"]),

    // Membuat post baru pada sebuah subreddit.
    // Contoh subreddit: r/memes.

    submitPost() {
      this.createNewPost(this.post);
    }
  },
  computed: {
    // Mendapatkan subreddit yang sedang dibuka dan semua post yang ada di subreddit itu.

    ...mapGetters("subreddit", ["getSubreddit", "getPosts"])
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
