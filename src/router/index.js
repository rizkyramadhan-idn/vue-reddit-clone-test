/* eslint-disable */

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Subreddits from "../views/Subreddits.vue";
import Subreddit from "../views/Subreddit.vue";
import Post from "../views/Post.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/subreddits",
    name: "Subreddits",
    component: Subreddits,
  },
  {
    path: "/r/:name",
    name: "Subreddit",
    component: Subreddit,
  },
  {
    path: "/r/:name/:post_id",
    name: "Post",
    component: Post,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
