<script lang="ts">
let i = 0;
</script>

<script setup lang="ts">

import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: { required: false },
    type: { type: String, default: 'text' },
    label: { type: String, required: false },
    placeholder: { type: String, required: false },
    min: { type: [String, Number], required: false },
    max: { type: [String, Number], required: false },
});

const uid = computed(() => `input-${i++}`);

const value = computed({
    get: () => props.modelValue as any,
    set: (v: any) => { emit('update:modelValue', v) }
});

const bindings = computed(() => ({
    id: uid.value,
    min: props.min,
    type: props.type,
    placeholder: props.placeholder,
}));

</script>

<template>
    <div class="mb-3">
        <label class="text-light" v-if="label" :for="uid">{{ label }}</label>
        <input
            class="form-control bg-black bg-opacity-10 border-secondary text-muted"
            v-bind="bindings"
            v-model="value"
        />
    </div>
</template>