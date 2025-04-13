<script setup lang="ts">
defineProps<{
  to?: string | object;
  href?: string;
  active?: boolean;
  disabled?: boolean;
}>();
</script>

<template>
  <li :class="{ disabled }">
    <component
      :is="to ? 'router-link' : 'a'"
      v-bind="{ to, href }"
      :class="{
        'w-full flex justify-between items-center': true,
        active,
      }">
      <slot />
    </component>
  </li>
</template>
