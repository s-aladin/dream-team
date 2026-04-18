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
              @update:selected="(val) => updateField('quickReplies', val)"
          />
        </div>
      <div class="form-fields-row">
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
      </div>
      <div class="form-fields-row">
        <PhoneInput
            label="Номер телефона"
            :modelValue="formData.phone"
            @update:modelValue="(val) => updateField('phone', val)"
        />
        <div class="form-field">
          <label class="form-field__label">Грейд</label>
          <select
              class="form-field__select"
              :value="formData.grade"
              @change="updateField('grade', $event.target.value)"
          >
            <option value="" disabled>Выберите</option>
            <option value="junior">Junior</option>
            <option value="middle">Middle</option>
            <option value="senior">Senior</option>
          </select>
        </div>
      </div>
        <div class="form-field">
          <label class="form-field__label">Дополнительная информация</label>
          <textarea
              class="form-field__textarea"
              :value="formData.additionalInfo"
              @input="updateField('additionalInfo', $event.target.value)"
              placeholder="Что понравилось и не понравилось"
              rows="4"
          />
        </div>
    </div>

    <div class="form__actions form__actions-desktop">
      <button class="button button--secondary" @click="$emit('cancel')">Отменить</button>
      <button class="button button--primary" @click="$emit('submit')">Отправить</button>
    </div>
  </div>
</template>

<script setup>
import PhoneInput from '@/components/fields/PhoneInput.vue'
import RatingStars from '@/components/fields/RatingStars.vue'
import QuickReplies from '@/components/fields/QuickReplies.vue'

defineProps({ formData: Object })
const emit = defineEmits(['update:formData', 'cancel', 'submit'])

const updateField = (field, value) => {
  emit('update:formData', { [field]: value })
}
</script>