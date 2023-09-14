<script setup lang="ts">
interface Props {
  value?: number | string;
}

defineProps<Props>();
</script>

<template>
  <span class="font-mono text-[15px] pt-0.5">
    <slot>
      {{ formatCurrency(value as any ?? 0) }}
    </slot>
  </span>
</template>
