<template>
  <div class="progress-bar">
    <div class="progress-bar__steps">
      <div
          class="progress-bar__step"
          :class="{
          'progress-bar__step--active': step === 1 || step === 2,
          'progress-bar__step--completed': step === 2
        }"
      >
        <span class="progress-bar__number">1</span>
      </div>

      <div class="progress-bar__line">
        <div
            class="progress-bar__line-fill"
            :style="{ width: lineFillWidth }"
        ></div>
      </div>

      <div
          class="progress-bar__step"
          :class="{ 'progress-bar__step--active': step === 2 }"
      >
        <span class="progress-bar__number">2</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  step: {
    type: Number,
    required: true,
    validator: (val) => [1, 2].includes(val)
  },
  step1Progress: {
    type: Number,
    default: 0,
    validator: (val) => val >= 0 && val <= 1
  }
});

const lineFillWidth = computed(() => {
  if (props.step === 2) return '100%';
  return `${props.step1Progress * 100}%`;
});
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;
  padding: 0 34px;
  margin-bottom: 20px;

  &__steps {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__step {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: #eff0f6;
    color: #6F6C90;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;

    &--active,
    &--completed {
      background-color: #4a3aff;
      color: #FFF;
    }
  }

  &__number {
    font-size: 16px;
    line-height: 18px;
    font-weight: 500;
  }

  &__line {
    flex: 1;
    height: 6px;
    background-color: #eff0f6;
    margin: 0 16px;
    border-radius: 3px;
    overflow: hidden;
  }

  &__line-fill {
    height: 100%;
    background-color: #4a3aff;
    transition: width 0.3s ease;
    border-radius: 3px;
  }
}
</style>