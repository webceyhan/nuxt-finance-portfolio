<script setup lang="ts">
interface Props {
  flush?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div
    :class="{
      'list-group': true,
      'list-group-flush': flush,
    }"
  >
    <slot />
  </div>
</template>
