<script setup lang="ts">
interface Props {
  src?: string;
}

defineProps<Props>();
</script>

<template>
  <img
    :src="src"
    class="rounded-circle"
    style="height: 2rem"
    referrerpolicy="no-referrer"
  />
</template>
