<template>
  <div class="navbar">
    <div style="cursor: pointer" @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btns">
      <MyButton @click="$router.push('/posts')">Посты</MyButton>
      <MyButton @click="$router.push('/about')" style="margin-left: 10px">О приложении</MyButton>
      <MyButton @click="$router.push('/store')" style="margin-left: 10px">VuexStore</MyButton>
      <MyButton @click="$router.push('/composition')" style="margin-left: 10px"
        >Composition Api</MyButton
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: rgb(128, 228, 195);
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>
