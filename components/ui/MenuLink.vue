<script setup lang="ts">
interface Props {
  to?: string | object;
  href?: string;
  active?: boolean;
  disabled?: boolean;
}

defineProps<Props>();
</script>

<template>
  <li :class="{ disabled }">
    <component :is="to ? 'router-link' : 'a'" v-bind="{ to, href }" :class="{ active }">
      <slot />
    </component>
  </li>
</template>
