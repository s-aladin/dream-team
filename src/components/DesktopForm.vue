<template>
  <div class="form form-desktop">
    <div class="form-fields">
      <div class="form-field">
        <RatingStars
            :rating="formData.rating"
            @update:rating="(val) => updateField('rating', val)"
        />
        <span v-if="errors.rating" class="form-field__error">{{ errors.rating }}</span>
      </div>
      <div class="form-field" v-show="formData.rating > 0">
        <QuickReplies
            :selected="formData.quickReplies"
            :rating="formData.rating"
            @update:selected="(val) => updateField('quickReplies', val)"
        />
      </div>
      <div class="form-fields-row">
        <FieldInput
            label="ФИО"
            :modelValue="formData.fullName"
            @update:modelValue="(val) => updateField('fullName', val)"
            placeholder="Иван Иванов"
            :error="errors.fullName"
        />
        <FieldInput
            label="Почта"
            type="email"
            :modelValue="formData.email"
            @update:modelValue="(val) => updateField('email', val)"
            placeholder="example@mail.com"
            :error="errors.email"
        />
      </div>
      <div class="form-fields-row">
        <PhoneInput
            label="Номер телефона"
            :modelValue="formData.phone"
            @update:modelValue="(val) => updateField('phone', val)"
            :error="errors.phone"
        />
        <div class="form-field">
          <label class="form-field__label">Грейд</label>
          <CustomSelect
              :modelValue="formData.grade"
              :options="gradeOptions"
              placeholder="Выберите"
              @update:modelValue="(val) => updateField('grade', val)"
          />
          <span v-if="errors.grade" class="form-field__error">{{ errors.grade }}</span>
        </div>
      </div>
      <TextareaInput
          label="Дополнительная информация"
          :modelValue="formData.additionalInfo"
          @update:modelValue="(val) => updateField('additionalInfo', val)"
          placeholder="Что понравилось и не понравилось"
          :rows="4"
      />
    </div>

    <div class="form__actions form__actions-desktop">
      <button class="button button--secondary" type="button" @click="emit('cancel')">
        Отменить
      </button>
      <button class="button button--primary" type="submit" @click.prevent="handleSubmit">
        Отправить
      </button>
    </div>
  </div>
</template>

<script setup>
import { useFeedbackForm } from '@/composables/useFeedbackForm.js';
import PhoneInput from '@/components/fields/PhoneInput.vue';
import RatingStars from '@/components/fields/RatingStars.vue';
import QuickReplies from '@/components/fields/QuickReplies.vue';
import CustomSelect from "@/components/UI/CustomSelect.vue";
import { gradeOptions } from '@/constants/feedbackFormConstants.js';
import FieldInput from "@/components/fields/FieldInput.vue";
import TextareaInput from "@/components/fields/TextareaInput.vue";

const emit = defineEmits(['cancel', 'submit'])

const { formData, updateFormData, errors, debouncedValidateField, validateStep1, validateStep2 } = useFeedbackForm()

const updateField = (field, value) => {
  updateFormData({ [field]: value })
  if (field in errors) {
    debouncedValidateField(field, value)
  }
}

const handleSubmit = () => {
  const isStep1Valid = validateStep1()
  const isStep2Valid = validateStep2()
  if (isStep1Valid && isStep2Valid) {
    emit('submit')
  }
}
</script>