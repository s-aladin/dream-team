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