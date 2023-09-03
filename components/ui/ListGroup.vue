<script setup lang="ts">
interface Props {
  flush?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div
    :class="{
      // base
      'border border-base-100 rounded-xl overflow-hidden': true,

      // vertical divider
      'divide-y-2 divide-base-100': true,
    }"
  >
    <slot />
  </div>
</template>
