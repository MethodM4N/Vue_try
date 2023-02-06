<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <PostItem v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)" />
  </div>
  <h2 v-else style="color: red; margin-left: 50px">Список постов пуст</h2>
</template>

<script>
import PostItem from './PostItem.vue';

export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
