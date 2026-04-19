<template>
  <div class="app">
    <FormController />
  </div>
</template>

<script setup>
import FormController from './components/FormController.vue'
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 68px 20px;
  background-color: #D9DBE9;

  @media (max-width: 767px) {
    padding: 28px 12px;
  }
}
</style>