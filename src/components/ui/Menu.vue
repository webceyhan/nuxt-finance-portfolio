<script setup lang="ts">
interface Props {
  horizontal?: boolean;
}

defineProps<Props>();
</script>

<template>
  <ul
    :class="{
      menu: true,
      'menu-horizontal': horizontal,
    }"
  >
    <slot />
  </ul>
</template>
