<template>
  <div class="form form-mobile">
    <transition :name="transitionName" mode="out-in">
      <div v-if="step === 1" key="step1" class="form-fields">
        <div class="form-field">
          <label class="form-field__label">ФИО</label>
          <input
              class="form-field__input"
              type="text"
              :value="formData.fullName"
              @input="updateField('fullName', $event.target.value)"
              placeholder="Иван Иванов"
          />
        </div>
        <div class="form-field">
          <label class="form-field__label">Почта</label>
          <input
              class="form-field__input"
              type="email"
              :value="formData.email"
              @input="updateField('email', $event.target.value)"
              placeholder="example@mail.com"
          />
        </div>
        <PhoneInput
            label="Номер телефона"
            :modelValue="formData.phone"
            @update:modelValue="(val) => updateField('phone', val)"
        />
      </div>

      <div v-else key="step2" class="form-fields">
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
        <div class="form-field">
          <label class="form-field__label">Дополнительная информация</label>
          <textarea
              class="form-field__textarea"
              :value="formData.additionalInfo"
              @input="updateField('additionalInfo', $event.target.value)"
              placeholder="Что понравилось и не понравилось"
              rows="3"
          />
        </div>
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
    </transition>

    <div class="form__bottom">
      <progress-bar :step="step" :step1-progress="step1Progress" />

      <div class="form__actions form__actions-mobile">
        <button class="button button--secondary" @click="handleBack">
          {{ step === 1 ? 'Отменить' : 'Назад' }}
        </button>
        <button class="button button--primary" @click="handleSubmit">
          {{ step === 1 ? 'Далее' : 'Отправить' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useFeedbackForm } from '@/composables/useFeedbackForm.js';
import PhoneInput from '@/components/fields/PhoneInput.vue';
import RatingStars from '@/components/fields/RatingStars.vue';
import QuickReplies from '@/components/fields/QuickReplies.vue';
import ProgressBar from "@/components/UI/ProgressBar.vue";
import CustomSelect from "@/components/UI/CustomSelect.vue";

const emit = defineEmits(['cancel', 'submit', 'error']);

const step = ref(1);
const direction = ref('forward');
const { formData, updateFormData, validateStep1 } = useFeedbackForm();
const gradeOptions = [
  { value: 'junior', label: 'Junior' },
  { value: 'middle', label: 'Middle' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Team lead' }
];

const updateField = (field, value) => {
  updateFormData({ [field]: value });
};

const goToStep2 = () => {
  if (validateStep1()) {
    direction.value = 'forward';
    step.value = 2;
  } else {
    emit('error');
  }
};

const step1Progress = computed(() => {
  const fields = [
    formData.fullName.trim(),
    formData.email.trim(),
    formData.phone.trim()
  ];
  const filledCount = fields.filter(field => field !== '').length;
  return filledCount / 3;
});

const transitionName = computed(() => {
  return direction.value === 'forward' ? 'slide-forward' : 'slide-back';
});

const handleBack = () => {
  if (step.value === 2) {
    direction.value = 'back';
    step.value = 1;
  } else {
    emit('cancel');
  }
};

const handleSubmit = () => {
  step.value === 2 ? emit('submit') : goToStep2();
};
</script>