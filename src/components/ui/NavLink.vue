<script setup lang="ts">
import { LinkProps } from "./types";

defineProps<LinkProps>();
</script>

<template>
  <component
    :is="url ? 'router-link' : 'a'"
    href="#"
    :to="url"
    :class="{
      'nav-link': true,
      active: active ?? $route.name === url,
      disabled,
    }"
  >
    <slot>{{ label }}</slot>
  </component>
</template>
