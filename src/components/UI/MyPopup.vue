<template>
  <div v-if="show" class="popup" @click.stop="hidePopup">
    <div @click.stop class="popup__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPopup',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hidePopup() {
      this.$emit('update:show', false);
    },
  },
};
</script>

<style scoped>
.popup {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}
.popup__content {
  margin: auto;
  padding: 5px 40px;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
}
</style>
