<template>
  <div class="result-screen">
    <div class="header result-screen__header">
      <h2 class="title result-screen__title">{{ isError ? 'Что-то пошло не так' : 'Спасибо, ваш ответ отправлен' }}</h2>
      <p class="description result-screen__description">{{ isError ? 'Попробуйте заполнить форму позже' : 'Свяжемся с вами в ближайшее время' }}</p>
    </div>
    <img v-if="isError" src="@/assets/images/Error.png" alt="Ошибка">
    <img v-else src="@/assets/images/Success.png" alt="Успешно">
    <div class="result-screen__actions">
      <button v-if="isError" class="button button--secondary" @click="$emit('back')">
        Закрыть
      </button>
      <button class="button button--primary" @click="$emit('back')">
        {{ isError ? 'Попробовать снова' : 'На главную' }}
      </button>
    </div>
  </div>
</template>

<script setup>
  defineEmits(['back']);

  defineProps({isError: Boolean});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.result-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 95px;

  @media (max-width: $breakpoint-mobile) {
    gap: $spacing-3xl;
  }

  &__title {
    margin-bottom: $spacing-sm;

    @media (max-width: $breakpoint-mobile) {
      margin-bottom: $spacing-xs;
    }
  }

  &__actions {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: $spacing-xl;

    @media (max-width: $breakpoint-mobile) {
      flex-direction: column-reverse;
      align-items: stretch;
      gap: $spacing-lg;
    }
  }
}
</style>