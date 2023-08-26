<script setup lang="ts">
import { Size, Variant } from "./types";

interface Props {
  label?: string;
  value?: number | string;
  variant?: Variant;
  size?: Size;
}

const sizeMap = {
  lg: "fs-1",
  md: "fs-3",
  sm: "fs-5",
};

withDefaults(defineProps<Props>(), {
  variant: "light",
  size: "md",
});
</script>

<template>
  <div>
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
