<template>
  <div class="app">
    <FeedbackFormController />
  </div>
</template>

<script setup>
import FeedbackFormController from './components/FeedbackFormController.vue'
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 68px 20px 0 20px;
  background-color: #D9DBE9;
}
</style>