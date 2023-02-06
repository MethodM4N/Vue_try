<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <div class="app_buttons">
      <MyButton @click="showPopup">Создать пост</MyButton>
      <MySelector v-model="selectedSort" :options="sortOptions"></MySelector>
    </div>
    <MyPopup v-model:show="popupVisible">
      <PostForm @create="createPost" />
    </MyPopup>
    <PostList v-if="!isPostLoading" :posts="sortedPosts" @remove="removePost" />
    <h2 v-else>Идет загрузка постов, пожалуйста подождите</h2>
  </div>
</template>

<script>
import axios from 'axios';

import PostForm from '@/components/PostForm.vue';
import PostList from './components/PostList.vue';

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      popupVisible: false,
      isPostLoading: true,
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.popupVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showPopup() {
      this.popupVisible = true;
    },
    async fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        this.posts = response.data;
      } catch (e) {
        alert('При запросе к серверу произошла ошибка');
      } finally {
        this.isPostLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]),
      );
    },
  },
  /*   watch: {
    selectedSort(newValue) {
      this.posts.sort((post1, post2) => {
        return post1[newValue]?.localeCompare(post2[newValue]);
      });
    },
  }, */
};
</script>

<style>
* {
  margin: 5;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
.app_buttons {
  display: flex;
  justify-content: space-between;
}
</style>
