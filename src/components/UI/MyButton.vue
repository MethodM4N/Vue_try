<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
};
</script>

<style scoped>
.btn {
  background-color: none;
  color: teal;
  padding: 10px 15px;
  border: 1px solid teal;
  cursor: pointer;
}
</style>
