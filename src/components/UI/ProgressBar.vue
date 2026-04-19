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
  margin-bottom: 20px;

  &__steps {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__step {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #eff0f6;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;

    &--active {
      background-color: #4a3aff;
    }

    &--completed {
      background-color: #4a3aff;
    }
  }

  &__number {
    font-size: 16px;
    font-weight: 700;
    color: #fff;
  }

  &__line {
    flex: 1;
    height: 6px;
    background-color: #eff0f6;
    margin: 0 8px;
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