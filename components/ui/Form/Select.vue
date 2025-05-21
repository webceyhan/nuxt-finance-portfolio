<script setup lang="ts">
import type { SelectHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ SelectHTMLAttributes {
  values?: any[];
}

defineProps<Props>();

const model = defineModel();
</script>

<template>
  <select class="select" v-model="model">
    <slot>
      <option v-for="value in values" :value>
        {{ $t(value) }}
      </option>
    </slot>
  </select>
</template>
