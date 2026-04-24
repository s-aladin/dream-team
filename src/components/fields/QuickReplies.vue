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
import { quickRepliesMap } from '@/constants/feedbackFormConstants.js';

const props = defineProps({
  selected: Array,
  rating: Number
});

const emit = defineEmits(['update:selected']);

const replyOptions = computed(() => {
  return quickRepliesMap[props.rating] || [];
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
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/typography' as *;

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.quick-replies {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-md;
  padding-bottom: $spacing-sm;

  @media (max-width: $breakpoint-mobile) {
    gap: $spacing-sm;
    padding-bottom: 0;
  }

  &__button {
    @include P-base;
    padding: 5px 16px;
    background-color: $color-300;
    border: none;
    border-radius: $radius-pill;
    color: $color-800;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: $color-600;
      color: $color-100;
    }

    &--active {
      background-color: $color-600;
      color: $color-100;
    }

    @media (max-width: $breakpoint-mobile) {
      @include P-mini;
      padding: 8px 12px;
      line-height: 26px;
    }
  }
}
</style>