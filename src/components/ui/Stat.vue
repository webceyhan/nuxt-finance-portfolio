<script setup lang="ts">
import { Variant, Size } from "./types";

interface Props {
  label?: string;
  value?: number | string;
  variant?: Variant;
  size?: Size;
}

const sizeMap = {
  lg: "fs-1",
  md: "fs-2",
  sm: "fs-3",
};

withDefaults(defineProps<Props>(), {
  variant: "light",
  size: "md",
});
</script>

<template>
  <div class="col">
    <label v-if="label" class="text-body-tertiary">{{ label }}</label>

    <p
      :class="{
        'fw-semibold': true,
        [sizeMap[size]]: size,
        [`text-${variant}`]: true,
      }"
    >
      <slot>{{ value }}</slot>
    </p>
  </div>
</template>
