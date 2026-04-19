<template>
  <transition name="fade">
    <div v-if="rating > 0" class="quick-replies">
      <button
          v-for="option in replyOptions"
          :key="option"
          class="quick-replies__button"
          :class="{ 'quick-replies__button--active': selected.includes(option) }"
          @click="toggleOption(option)"
          type="button"
      >
        {{ option }}
      </button>
    </div>
  </transition>
</template>

<script setup>
import { computed, watch } from 'vue';

const props = defineProps({
  selected: Array,
  rating: Number
});

const emit = defineEmits(['update:selected']);

const replyOptions = computed(() => {
  const optionsMap = {
    1: ['Ужасно', 'Не понравилось', 'Жесть', 'Всё плохо', 'Фу фу фу', 'Отвратительно'],
    2: ['Не очень', 'Делал и лучше', 'Так себе', 'Слабовато', 'Могло быть лучше'],
    3: ['Нормик', 'Средне', 'Пойдёт', 'Обычно', 'Ничего особенного', 'Пупупу...'],
    4: ['Прикольно', 'Интересно', 'Хорошо', 'Зашло', 'Круто', 'Стильно, модно, молодежно'],
    5: ['Вааау', 'Супер!', 'Топчик', 'Бомба', 'Шикарно', 'Мама, я в раю']
  };
  return optionsMap[props.rating] || [];
});

const toggleOption = (option) => {
  const newSelected = props.selected.includes(option)
      ? props.selected.filter(item => item !== option)
      : [...props.selected, option];
  emit('update:selected', newSelected);
};

watch(
    () => props.rating,
    (newRating, oldRating) => {
      if (newRating !== oldRating) {
        emit('update:selected', []);
      }
    }
);
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>