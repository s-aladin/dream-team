<template>
  <div class="form-field">
    <label v-if="label" :for="fieldId" class="form-field__label">{{ label }}</label>
    <input
        :id="fieldId"
        class="form-field__input"
        :type="type"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
import { useId } from 'vue';

defineProps({
  modelValue: String,
  label: String,
  type: { type: String, default: 'text' },
  placeholder: String
});

const emit = defineEmits(['update:modelValue']);

const fieldId = useId();
</script>