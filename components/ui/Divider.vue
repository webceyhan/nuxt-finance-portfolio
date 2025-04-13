<script setup lang="ts">
defineProps<{
  vertical?: boolean;
}>();
</script>

<template>
  <div
    :class="{
      'divider m-1': true,
      'divider-horizontal': vertical,
    }">
    <slot />
  </div>
</template>
