<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput v-focus v-model="searchValue" @input="updateInput" placeholder="Найти пост"></MyInput>
    <div class="app__buttons">
      <MyButton @click="showPopup">Создать пост</MyButton>
      <MySelector v-model="selectedSort" :options="sortOptions"></MySelector>
    </div>
    <MyPopup v-model:show="popupVisible">
      <PostForm />
    </MyPopup>
    <PostList v-if="!isPostLoading" :posts="sortedSearchedPosts" />
    <h2 v-else>Идет загрузка постов, пожалуйста подождите</h2>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import usePosts from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts';

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      popupVisible: false,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
      ],
    };
  },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
  setup(props) {
    const { posts, isPostLoading, totalPages } = usePosts(10);
    const { selectedSort, sortedPosts } = useSortedPosts(posts);
    const { searchValue, sortedSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      totalPages,
      isPostLoading,
      selectedSort,
      sortedPosts,
      searchValue,
      sortedSearchedPosts,
    };
  },
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
