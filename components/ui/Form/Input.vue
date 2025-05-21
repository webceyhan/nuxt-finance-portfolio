<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {}

defineProps<Props>();

const model = defineModel();
</script>

<template>
  <input class="input" type="text" v-model="model" />
</template>
