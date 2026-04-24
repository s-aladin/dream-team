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