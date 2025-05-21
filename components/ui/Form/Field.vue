<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  label?: string;
  values?: any[];
}

defineOptions({
  inheritAttrs: false,
});

defineProps<Props>();

const model = defineModel();

const uid = useId();
</script>

<template>
  <fieldset class="fieldset">
    <label v-if="label" class="fieldset-label" v-html="label" />

    <slot>
      <template v-if="values">
        <div v-if="$attrs.type === 'radio'" class="flex gap-4">
          <Radio
            v-for="value in values"
            :value
            :name="uid"
            v-model="model"
            v-bind="$attrs" />
        </div>

        <Select v-else :values v-model="model" v-bind="$attrs" />
      </template>

      <Input v-else v-model="model" v-bind="$attrs" />
    </slot>
  </fieldset>
</template>
