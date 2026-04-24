<template>
  <div class="form form-desktop">
    <div class="form-fields">
      <div class="form-field">
        <RatingStars
            :rating="formData.rating"
            @update:rating="(val) => updateField('rating', val)"
        />
      </div>
      <div class="form-field">
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
        />
        <FieldInput
            label="Почта"
            type="email"
            :modelValue="formData.email"
            @update:modelValue="(val) => updateField('email', val)"
            placeholder="example@mail.com"
        />
      </div>
      <div class="form-fields-row">
        <PhoneInput
            label="Номер телефона"
            :modelValue="formData.phone"
            @update:modelValue="(val) => updateField('phone', val)"
        />
        <div class="form-field">
          <label class="form-field__label">Грейд</label>
          <CustomSelect
              :modelValue="formData.grade"
              :options="gradeOptions"
              placeholder="Выберите"
              @update:modelValue="(val) => updateField('grade', val)"
          />
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
      <button class="button button--secondary" @click="emit('cancel')">
        Отменить
      </button>
      <button class="button button--primary" @click="emit('submit')">
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

const emit = defineEmits(['cancel', 'submit']);

const { formData, updateFormData } = useFeedbackForm();

const updateField = (field, value) => {
  updateFormData({ [field]: value });
};
</script>