<script setup lang="ts">
import Tab from "./Tab.vue";

interface Props {
  boxed?: boolean;
  block?: boolean;
  options?: string[];
  modelValue?: string;
}

defineEmits(["update:modelValue"]);

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
    <slot>
      <Tab
        class="capitalize"
        v-for="opt in options"
        :key="opt"
        :active="opt === modelValue"
        @click.prevent="$emit('update:modelValue', opt)"
        v-html="opt"
        bordered
      />
    </slot>

    <!-- this fills the space till the end of the line -->
    <Tab v-if="block" class="w-full cursor-default" bordered />
  </div>
</template>
