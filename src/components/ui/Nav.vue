<script setup lang="ts">
import { LinkProps } from "./types";
import NavLink from "./NavLink.vue";

interface Props {
  type?: "tabs" | "pills";
  links?: LinkProps[];
}

defineProps<Props>();
</script>

<template>
  <ul
    :class="{
      nav: true,
      'nav-tabs': type === 'tabs',
      'nav-pills': type === 'pills',
    }"
  >
    <slot>
      <NavLink v-for="(link, i) in links" :key="i" v-bind="link" />
    </slot>
  </ul>
</template>
