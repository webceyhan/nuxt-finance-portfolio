<script setup lang="ts">
defineEmits(["update:modelValue"]);

defineProps<{
  boxed?: boolean;
  block?: boolean;
  options?: string[];
  modelValue?: string;
}>();
</script>

<template>
  <div
    :class="[
      'tabs',
      {
        'tabs-boxed': boxed,
        'flex-nowrap': block,
      },
    ]">
    <slot>
      <Tab
        class="capitalize"
        v-for="opt in options"
        :key="opt"
        :active="opt === modelValue"
        @click.prevent="$emit('update:modelValue', opt)"
        bordered>
        {{ $t(opt) }}
      </Tab>
    </slot>

    <!-- this fills the space till the end of the line -->
    <Tab v-if="block" class="w-full cursor-default" bordered />
  </div>
</template>
