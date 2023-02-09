import { computed, ref } from 'vue';

export default function useSortedPosts(sortedPosts) {
  const searchValue = ref('');

  const sortedSearchedPosts = computed(() => {
    return sortedPosts.value.filter((post) =>
      post.title.toLowerCase().includes(searchValue.value.toLowerCase()),
    );
  });

  return {
    searchValue,
    sortedSearchedPosts,
  };
}
