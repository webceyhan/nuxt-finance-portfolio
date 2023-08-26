<script lang="ts">
let i = 0;

export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  class?: string;
  label?: string;
  modelValue?: any;
}

const emit = defineEmits(["update:modelValue"]);

const props = defineProps<Props>();

const uid = computed(() => `input-${i++}`);

const value = computed({
  get: () => props.modelValue,
  set: (v: any) => {
    emit("update:modelValue", v);
  },
});
</script>

<template>
  <div class="mb-3" :class="class">
    <label v-if="label" :for="uid">{{ label }}</label>
    <input type="text" class="form-control" :id="uid" v-bind="$attrs" v-model="value" />
  </div>
</template>
