<template>
  <div class="rating-stars" @mouseleave="hoverRating = 0">
    <button
        v-for="star in 5"
        :key="star"
        class="rating-stars__star"
        :class="{ 'rating-stars__star--active': star <= (hoverRating || rating) }"
        @click="$emit('update:rating', star)"
        @mouseenter="hoverRating = star"
        type="button"
    ></button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  rating: Number
});

defineEmits(['update:rating']);

const hoverRating = ref(0);
</script>