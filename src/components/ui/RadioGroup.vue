<script lang="ts">
let i = 0;
</script>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue?: any;
  options: any[];
}

const emit = defineEmits(["update:modelValue"]);

const props = defineProps<Props>();

const uid = computed(() => `radio-group-${i++}`);

const value = computed({
  get: () => props.modelValue,
  set: (v: any) => emit("update:modelValue", v),
});
</script>

<template>
  <div class="btn-group mb-3" role="group">
    <template v-for="option in options">
      <input
        type="radio"
        class="btn-check"
        autocomplete="off"
        :name="uid"
        :id="`${uid}-${option}`"
        :value="option"
        v-model="value"
      />
      <label
        class="btn btn-outline-secondary text-capitalize"
        :for="`${uid}-${option}`"
        >{{ option }}</label
      >
    </template>
  </div>
</template>
