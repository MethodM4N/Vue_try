<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput
      v-focus
      :model-value="searchValue"
      @update:model-value="setSearchValue"
      placeholder="Найти пост"
    ></MyInput>
    <div class="app__buttons">
      <MyButton @click="showPopup">Создать пост</MyButton>
      <MySelector
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      ></MySelector>
    </div>
    <MyPopup v-model:show="popupVisible">
      <PostForm @create="createPost" />
    </MyPopup>
    <PostList v-if="!isPostLoading" :posts="sortedSearchedPosts" @remove="removePost" />
    <h2 v-else>Идет загрузка постов, пожалуйста подождите</h2>
    <div class="app__obsetver" v-intersection="loadMorePosts"></div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      popupVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchValue: 'post/setSearchValue',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
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
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostLoading: (state) => state.post.isPostLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchValue: (state) => state.post.searchValue,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedSearchedPosts: 'post/sortedSearchedPosts',
    }),
  },
  watch: {},
};
</script>

<style>
.app__buttons {
  display: flex;
  justify-content: space-between;
}
.app__observer {
  height: 30px;
  background: green;
}
</style>
