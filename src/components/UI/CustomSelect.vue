<template>
  <div
      class="custom-select"
      ref="selectRef"
      role="combobox"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-controls="listId"
      @focusout="handleFocusOut"
  >
    <div
        class="custom-select__trigger"
        :class="{ 'is-open': isOpen }"
        @click="toggleDropdown"
        @keydown="handleTriggerKeydown"
        role="button"
        tabindex="0"
        aria-label="Выбор грейда"
    >
      <span class="custom-select__value" :class="{ 'is-placeholder': !selectedLabel }">
        {{ selectedLabel || placeholder }}
      </span>
      <span class="custom-select__arrow" :class="{ 'is-open': isOpen }">
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.75 0.75L6.75 6.75L12.75 0.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </div>
    <transition name="dropdown-fade">
      <div
          v-if="isOpen"
          :id="listId"
          class="custom-select__dropdown"
          role="listbox"
          :aria-label="placeholder"
          tabindex="-1"
          @keydown="handleListKeydown"
      >
        <div
            v-for="(option, index) in options"
            :key="option.value"
            class="custom-select__option"
            :class="{
            'is-selected': modelValue === option.value,
            'is-focused': activeIndex === index
          }"
            role="option"
            :aria-selected="modelValue === option.value"
            @click="selectOption(option)"
            :tabindex="-1"
            :ref="el => setOptionRef(el, index)"
        >
          {{ option.label }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, useId } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    required: true,
    validator: (val) => val.every(opt => 'value' in opt && 'label' in opt)
  },
  placeholder: {
    type: String,
    default: 'Выберите'
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectRef = ref(null);
const activeIndex = ref(-1);
const optionRefs = ref([]);
const listId = useId();

const selectedLabel = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue);
  return selected ? selected.label : '';
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    const selectedIdx = props.options.findIndex(opt => opt.value === props.modelValue);
    activeIndex.value = selectedIdx >= 0 ? selectedIdx : 0;

    nextTick(() => {
      focusActiveOption();
    });
  }
};

const closeDropdown = () => {
  isOpen.value = false;
  selectRef.value?.querySelector('.custom-select__trigger')?.focus();
};

const selectOption = (option) => {
  emit('update:modelValue', option.value);
  closeDropdown();
};

const handleClickOutside = (event) => {
  if (selectRef.value && !selectRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

const handleFocusOut = (e) => {
  if (selectRef.value && !selectRef.value.contains(e.relatedTarget)) {
    isOpen.value = false;
  }
};

const handleTriggerKeydown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleDropdown();
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    if (!isOpen.value) {
      isOpen.value = true;
      const selectedIdx = props.options.findIndex(opt => opt.value === props.modelValue);
      activeIndex.value = selectedIdx >= 0 ? selectedIdx : 0;
      nextTick(() => focusActiveOption());
    } else {
      if (e.key === 'ArrowDown') {
        activeIndex.value = (activeIndex.value + 1) % props.options.length;
      } else if (e.key === 'ArrowUp') {
        activeIndex.value = (activeIndex.value - 1 + props.options.length) % props.options.length;
      }
      focusActiveOption();
    }
  } else if (e.key === 'Escape') {
    closeDropdown();
  }
};

const handleListKeydown = (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeIndex.value = (activeIndex.value + 1) % props.options.length;
    focusActiveOption();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeIndex.value = (activeIndex.value - 1 + props.options.length) % props.options.length;
    focusActiveOption();
  } else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    if (activeIndex.value >= 0) {
      selectOption(props.options[activeIndex.value]);
    }
  } else if (e.key === 'Escape') {
    e.preventDefault();
    closeDropdown();
  }
};

const focusActiveOption = () => {
  const optionEl = optionRefs.value[activeIndex.value];
  if (optionEl) {
    optionEl.focus();
  }
};

const setOptionRef = (el, index) => {
  optionRefs.value[index] = el;
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="scss" scoped>
.custom-select {
  position: relative;
  width: 100%;
  user-select: none;

  &__trigger {
    width: 100%;
    padding: 13px 15px;
    font-size: 16px;
    line-height: 28px;
    border: 1px solid #F7F7FB;
    border-radius: 8px;
    background-color: #F7F7FB;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: border-color 0.2s;

    &:hover {
      border-color: #D9DBE9;
    }

    &.is-open {
      border-color: #4A3AFF;
    }
  }

  &__value {
    color: #1F2937;

    &.is-placeholder {
      color: #94a3b8;
    }
  }

  &__arrow {
    display: inline-flex;
    color: #A0A3BD;
    transition: transform 0.2s ease;

    &.is-open {
      color: #4A3AFF;
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: #FFFFFF;
    border: 1px solid #F7F7FB;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 10;
    max-height: 216px;
    overflow-y: auto;
    padding: 4px 0;
  }

  &__option {
    padding: 13px 16px;
    font-size: 16px;
    line-height: 28px;
    color: #1F2937;
    cursor: pointer;
    transition: background-color 0.15s;

    &:hover {
      background-color: #F7F7FB;
    }

    &.is-focused {
      background-color: #F7F7FB;
      outline: none;
    }

    &.is-selected {
      background-color: #4A3AFF;
      color: #FFFFFF;

      &:hover {
        background-color: #3A2ACC;
      }
    }
  }
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 767px) {
  .custom-select {
    &__trigger {
      padding: 11px 15px;
      font-size: 14px;
      line-height: 20px;
    }

    &__dropdown {
      max-height: 176px;
    }

    &__option {
      padding: 12px 16px;
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style>