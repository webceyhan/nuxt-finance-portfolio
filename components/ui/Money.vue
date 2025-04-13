<script setup lang="ts">
defineProps<{
  value?: number | string;
}>();
</script>

<template>
  <span class="font-mono text-[15px] pt-0.5">
    <slot>
      {{ formatCurrency((value as any) ?? 0) }}
    </slot>
  </span>
</template>
