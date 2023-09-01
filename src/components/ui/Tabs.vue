<script setup lang="ts">
import Tab from "./Tab.vue";

interface Props {
  boxed?: boolean;
  block?: boolean;
}

defineProps<Props>();
</script>

<template>
  <div
    :class="[
      'tabs',
      {
        'tabs-boxed': boxed,
        'flex-nowrap': block,
      },
    ]"
  >
    <slot />

    <!-- this fills the space till the end of the line -->
    <Tab v-if="block" class="w-full cursor-default" bordered />
  </div>
</template>
