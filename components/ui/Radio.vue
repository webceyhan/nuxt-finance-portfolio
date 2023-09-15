<script lang="ts">
let i = 0;
</script>

<script setup lang="ts">
import { Variant } from "./types";

interface Props {
  class?: string;
  label?: string;
  name?: string;
  value?: any;
  variant?: Variant;
  modelValue?: any;
}

const emit = defineEmits(["update:modelValue"]);

const props = defineProps<Props>();

const uid = `radio-${i++}`;

const proxyValue = computed({
  get: () => props.modelValue,
  set: (v: any) => emit("update:modelValue", v),
});
</script>

<template>
  <div class="form-control" :class="class">
    <label class="label cursor-pointer space-x-2" :for="uid">
      <input
        type="radio"
        :class="{
          radio: true,
          'radio-primary': variant === 'primary',
          'radio-secondary': variant === 'secondary',
          'radio-accent': variant === 'accent',
          'radio-info': variant === 'info',
          'radio-success': variant === 'success',
          'radio-warning': variant === 'warning',
          'radio-error': variant === 'error',
        }"
        :id="uid"
        :name="name"
        :value="value"
        v-model="proxyValue"
        autocomplete="off"
      />

      <span class="label-text capitalize">
        <slot>{{ $t(label ?? value) }}</slot>
      </span>
    </label>
  </div>
</template>
