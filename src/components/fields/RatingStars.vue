<template>
  <div class="rating-stars">
    <button
        v-for="star in 5"
        :key="star"
        class="rating-stars__star"
        :class="{ 'rating-stars__star--active': star <= rating }"
        @click="$emit('update:rating', star)"
        type="button"
    ></button>
  </div>
</template>

<script setup>
defineProps({
  rating: Number
})
defineEmits(['update:rating'])
</script>