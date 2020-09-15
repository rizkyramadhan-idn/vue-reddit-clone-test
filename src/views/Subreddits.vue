<template>
  <div v-if="getSubreddits.length" class="card">
    <div class="card-header">
      Subreddits
    </div>

    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li
          v-for="subreddit in getSubreddits"
          :key="subreddit.id"
          class="list-group-item"
        >
          <router-link
            v-bind:to="{ name: 'Subreddit', params: { name: subreddit.name } }"
          >
            <p class="card-title">r/{{ subreddit.name }}</p>
            <p class="card-subtitle text-muted">{{ subreddit.description }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>

  <div v-else>
    <p>Loading ...</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("subreddits", ["init"]),
  },
  computed: {
    ...mapGetters("subreddits", ["getSubreddits"]),
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
.list-group-item {
  line-height: 90%;
}

.list-group-item:hover {
  cursor: pointer;
  background-color: #f5f6fa;
}
</style>
