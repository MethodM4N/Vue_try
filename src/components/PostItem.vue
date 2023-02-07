<template>
  <div class="post">
    <div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>
    <div>
      <MyButton class="post__btn" @click="$emit('remove', post)">Удалить</MyButton>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.post {
  margin-bottom: 4px;
  padding: 15px;
  border: 1px solid green;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post:last-of-type {
  margin-bottom: 25px;
}
</style>
