<script setup lang="ts">
interface Props {
  vertical?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div
    :class="{
      divider: true,
      'divider-horizontal': vertical,
    }"
  >
    <slot />
  </div>
</template>
