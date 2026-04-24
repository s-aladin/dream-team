<template>
  <div
      class="rating-stars"
      role="radiogroup"
      aria-label="Оценка"
      @mouseleave="hoverRating = 0"
  >
    <button
        v-for="star in 5"
        :key="star"
        class="rating-stars__star"
        :class="{ 'rating-stars__star--active': star <= (hoverRating || rating) }"
        :aria-label="`${star} звезда`"
        :aria-checked="star <= rating"
        role="radio"
        @click="emit('update:rating', star)"
        @mouseenter="hoverRating = star"
        type="button"
    >
      <StarIcon :filled="star <= (hoverRating || rating)" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import StarIcon from '@/components/UI/StarIcon.vue';

defineProps({
  rating: Number
});

const emit = defineEmits(['update:rating']);
const hoverRating = ref(0);
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.rating-stars {
  align-self: center;
  display: flex;
  gap: 22px;
  padding-bottom: $spacing-sm;

  @media (max-width: $breakpoint-mobile) {
    gap: $spacing-sm;
    padding-bottom: 0;
  }

  &__star {
    max-width: 44px;
    width: 100%;
    max-height: 44px;
    padding: 5px;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
    background: none;

    .icon {
      display: block;
      width: 100%;
      height: 100%;
    }

    @media (max-width: $breakpoint-mobile) {
      max-width: 32px;
      max-height: 32px;
      padding: $spacing-xs;
    }
  }
}
</style>