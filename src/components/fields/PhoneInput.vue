<template>
  <div class="form-field">
    <label v-if="label" class="form-field__label">{{ label }}</label>
    <input
        class="form-field__input"
        type="tel"
        :value="formattedValue"
        @input="handleInput"
        :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '+7 (000) 000 00 00'
  }
})

const emit = defineEmits(['update:modelValue'])

const formattedValue = computed(() => {
  const digits = props.modelValue.replace(/\D/g, '')
  let masked = '+7 '
  if (digits.length > 1) masked += '(' + digits.slice(1, 4)
  if (digits.length >= 4) masked += ') ' + digits.slice(4, 7)
  if (digits.length >= 7) masked += ' ' + digits.slice(7, 9)
  if (digits.length >= 9) masked += ' ' + digits.slice(9, 11)
  return masked.trim()
})

const handleInput = (e) => {
  const input = e.target.value
  const digits = input.replace(/\D/g, '')
  const limitedDigits = digits.slice(0, 11)
  emit('update:modelValue', limitedDigits)
}
</script>