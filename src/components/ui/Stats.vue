<script setup lang="ts">
interface Props {
  vertical?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div
    :class="{
      stats: true,
      'stats-vertical': vertical,
    }"
  >
    <slot />
  </div>
</template>
