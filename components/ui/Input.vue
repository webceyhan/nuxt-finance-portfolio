<script lang="ts">
let i = 0;

export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { Variant } from "./types";

interface Props {
  class?: string;
  label?: string;
  variant?: Variant;
  modelValue?: any;
}

const emit = defineEmits(["update:modelValue"]);

const props = defineProps<Props>();

const uid = `input-${i++}`;

const proxyValue = computed({
  get: () => props.modelValue,
  set: (v: any) => {
    emit("update:modelValue", v);
  },
});
</script>

<template>
  <div class="form-control" :class="class">
    <label v-if="label" :for="uid" class="label">
      <span class="label-text" v-html="label" />
    </label>

    <input
      type="text"
      :class="{
        'input input-bordered': true,
        'input-ghost': variant === 'ghost',
        'input-primary': variant === 'primary',
        'input-secondary': variant === 'secondary',
        'input-accent': variant === 'accent',
        'input-info': variant === 'info',
        'input-success': variant === 'success',
        'input-warning': variant === 'warning',
        'input-error': variant === 'error',
      }"
      :id="uid"
      v-bind="$attrs"
      v-model="proxyValue"
    />
  </div>
</template>
