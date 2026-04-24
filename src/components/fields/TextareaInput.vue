<template>
  <div class="form-field">
    <label v-if="label" :for="fieldId" class="form-field__label">{{ label }}</label>
    <textarea
        :id="fieldId"
        class="form-field__textarea"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :rows="rows"
    />
  </div>
</template>

<script setup>
import { useId } from 'vue';

defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  rows: { type: Number, default: 4 }
});

const emit = defineEmits(['update:modelValue']);

const fieldId = useId();
</script>