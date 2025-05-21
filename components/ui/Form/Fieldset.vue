<script setup lang="ts">
defineProps<{
  grid?: boolean;
}>();
</script>

<template>
  <fieldset :class="['fieldset', { grid }]">
    <slot />
  </fieldset>
</template>

<style>
fieldset.grid > * {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
</style>
