<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ Omit<InputHTMLAttributes, "type"> {
  class?: string;
  value: string;
}

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<Props>();

const model = defineModel();
</script>

<template>
  <label :class="['label cursor-pointer space-x-1', props.class]">
    <input
      class="radio"
      type="radio"
      :value
      v-bind="$attrs"
      v-model="model"
      autocomplete="off" />

    <span class="label-text capitalize">
      <slot>{{ $t(value) }}</slot>
    </span>
  </label>
</template>
