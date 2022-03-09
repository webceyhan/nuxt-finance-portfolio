<script setup lang="ts">

import { computed } from 'vue';

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
    <button :class="classes" type="button">
        <slot></slot>
    </button>
</template>