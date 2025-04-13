<script setup lang="ts">
defineProps<{
  horizontal?: boolean;
}>();
</script>

<template>
  <ul
    :class="{
      menu: true,
      'menu-horizontal': horizontal,
    }">
    <slot />
  </ul>
</template>
