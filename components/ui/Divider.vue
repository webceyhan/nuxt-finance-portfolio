<script setup lang="ts">
interface Props {
  vertical?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div
    :class="{
      'divider m-1': true,
      'divider-horizontal': vertical,
    }"
  >
    <slot />
  </div>
</template>
