<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <MyInput v-model="searchValue" @input="updateInput" placeholder="Найти пост"></MyInput>
    <div class="app__buttons">
      <MyButton @click="showPopup">Создать пост</MyButton>
      <MySelector v-model="selectedSort" :options="sortOptions"></MySelector>
    </div>
    <MyPopup v-model:show="popupVisible">
      <PostForm @create="createPost" />
    </MyPopup>
    <PostList v-if="!isPostLoading" :posts="sortedSearchedPosts" @remove="removePost" />
    <h2 v-else>Идет загрузка постов, пожалуйста подождите</h2>
    <div class="app__obsetver" ref="observer"></div>
    <!--     <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page__value"
        :class="{ 'current-page': page === pageNumber }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
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
      searchValue: '',
      page: 1,
      limit: 10,
      totalPages: 0,
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
    /*     changePage(pageNumber) {
      this.page = pageNumber;
    }, */
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        alert('При запросе к серверу произошла ошибка');
      } finally {
        this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('При запросе к серверу произошла ошибка');
      }
    },
  },
  mounted() {
    this.fetchPosts();
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]),
      );
    },
    sortedSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchValue.toLowerCase()),
      );
    },
  },
  watch: {
    /* page() {
      this.fetchPosts();
    }, */
  },
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
.app__buttons {
  display: flex;
  justify-content: space-between;
}
.app__observer {
  height: 30px;
  background: green;
}
/* .page__wrapper {
  display: flex;
  justify-content: center;
}
.page__value {
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.315);
  padding: 5px 10px;
}
.current-page {
  border: 1.5px solid black;
} */
</style>
