<script lang="ts">
let i = 0;
</script>

<script setup lang="ts">
import { computed } from "vue";
import { Variant } from "./types";

interface Props {
  modelValue?: any;
  variant?: Variant;
  outline?: boolean;
  options: any[];
}

const emit = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
});

const uid = computed(() => `radio-group-${i++}`);

const value = computed({
  get: () => props.modelValue,
  set: (v: any) => emit("update:modelValue", v),
});
</script>

<template>
  <div class="btn-group" role="group">
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
        :for="`${uid}-${option}`"
        :class="{
          btn: true,
          [`btn-${outline ? 'outline-' : ''}${variant}`]: variant,
        }"
      >
        {{ option }}
      </label>
    </template>
  </div>
</template>
