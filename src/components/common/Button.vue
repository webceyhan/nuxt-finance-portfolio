<script setup lang="ts">

import { computed, ref } from 'vue';

/**
 * bugfix: ref to vue component is not working on vue3
 * as a workaround, we use ref to store wrapper element
 * and expose it as a property to acces it.
 */
const root = ref<any>(null);

defineExpose({ root });

const props = defineProps({
    variant: { type: String, default: 'primary' },
    sm: Boolean,
    close: Boolean
});

const classes = computed(() => ({
    'btn': true,
    'btn-sm': props.sm,
    [`btn-${props.variant}`]: !props.close,
    'btn-close btn-close-white': props.close,
}));

</script>

<template>
    <button :class="classes" type="button" ref="root">
        <slot></slot>
    </button>
</template>