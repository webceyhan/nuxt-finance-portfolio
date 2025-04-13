<script setup lang="ts">
defineProps<{
  horizontal?: boolean;
  forDropdown?: boolean;
}>();
</script>

<template>
  <ul
    :tabindex="forDropdown ? 0 : undefined"
    :class="{
      menu: true,
      'menu-horizontal': horizontal,
      'dropdown-content z-[1] mt-3 p-2 rounded-box shadow': forDropdown,
    }">
    <slot />
  </ul>
</template>
