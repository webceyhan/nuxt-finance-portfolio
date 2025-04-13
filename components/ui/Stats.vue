<script setup lang="ts">
defineProps<{
  vertical?: boolean;
}>();
</script>

<template>
  <div
    :class="{
      stats: true,
      'stats-vertical': vertical,
    }">
    <slot />
  </div>
</template>
