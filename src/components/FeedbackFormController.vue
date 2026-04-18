<template>
  <transition name="fade" mode="out-in">
    <div v-if="showResultScreen" class="container result-screen__wrapper">
      <ResultScreen
          @back="showResultScreen = false; isError = false;"
          :is-error="isError"
      />
    </div>
    <div v-else key="form" class="container form__wrapper">
      <div class="header form__header">
        <h2 class="title form__title">Форма обратной связи</h2>
        <p class="description form__description">Пожалуйста, оцените свой опыт прохождения тестового</p>
      </div>

      <DesktopForm
          v-if="!isMobile"
          :formData="formData"
          @update:formData="updateFormData"
          @cancel="handleCancel"
          @submit="handleSubmit"
      />

      <MobileForm
          v-else
          :formData="formData"
          @update:formData="updateFormData"
          @cancel="handleCancel"
          @submit="handleSubmit"
          @error="isError = true; showResultScreen = true"
      />
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useFeedbackForm } from '../composables/useFeedbackForm.js'
import DesktopForm from './DesktopForm.vue'
import MobileForm from './MobileForm.vue'
import ResultScreen from './ResultScreen.vue'

const showResultScreen = ref(false)
const isError = ref(false)
const isMobile = ref(false)

const { formData, updateFormData, resetForm, validateStep1, validateStep2 } = useFeedbackForm()

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 767
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const handleSubmit = () => {
  const isValid = isMobile.value ? validateStep2() : (validateStep1() && validateStep2())
  if (!isValid) {
    isError.value = true;
    showResultScreen.value = true;
    return
  }
  console.log('Form submitted:', formData)
  isError.value = false;
  showResultScreen.value = true;
}

const handleCancel = () => {
  resetForm()
  isError.value = false;
  showResultScreen.value = false;
}

const handleGoHome = () => {
  resetForm()
  isError.value = false;
  showResultScreen.value = false;
}
</script>