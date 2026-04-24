<template>
  <div class="app">
    <FormController />
  </div>
</template>

<script setup>
import FormController from './components/FormController.vue'
</script>

<style lang="scss" scoped>
@use 'assets/styles/variables' as *;

.app {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 68px 20px;
  background-color: $color-400;

  @media (max-width: $breakpoint-mobile) {
    padding: 28px 12px;
  }
}
</style>