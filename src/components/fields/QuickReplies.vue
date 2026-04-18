<template>
  <div class="quick-replies">
    <button
        v-for="option in options"
        :key="option"
        class="quick-replies__button"
        :class="{ 'quick-replies__button--active': selected.includes(option) }"
        @click="toggleOption(option)"
        type="button"
    >
      {{ option }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  selected: Array
})
const emit = defineEmits(['update:selected'])

const options = ref([
  'Нормик',
  'Легко',
  'Быстро сделал',
  'Долго разбирался',
  'Не понравилось'
])

const toggleOption = (option) => {
  const newSelected = props.selected.includes(option)
      ? props.selected.filter(item => item !== option)
      : [...props.selected, option]
  emit('update:selected', newSelected)
}
</script>