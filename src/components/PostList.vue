<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <TransitionGroup name="post-list">
      <PostItem v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)" />
    </TransitionGroup>
  </div>
  <h2 v-else style="color: red; margin-left: 50px">Список постов пуст</h2>
</template>

<script>
import { TransitionGroup } from 'vue';
import PostItem from './PostItem.vue';

export default {
  components: {
    PostItem,
    TransitionGroup,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease-in-out;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.post-list-move {
  transition: transform 0.5s ease;
}
</style>
