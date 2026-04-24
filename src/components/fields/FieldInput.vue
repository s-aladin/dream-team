<template>
  <div class="form-field">
    <label v-if="label" :for="fieldId" class="form-field__label">{{ label }}</label>
    <input
        :id="fieldId"
        class="form-field__input"
        :class="{ 'form-field__input--error': error }"
        :type="type"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
    />
    <span v-if="error" class="form-field__error">{{ error }}</span>
  </div>
</template>

<script setup>
import { useId } from 'vue'

defineProps({
  modelValue: String,
  label: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  error: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])
const fieldId = useId()
</script>