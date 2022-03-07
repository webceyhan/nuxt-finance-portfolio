<script setup lang="ts">

import { PropType } from 'vue';

defineProps({
    action: Boolean,
    to: {
        type: Object as PropType<any>,
        required: false,
    },
});

</script>

<template>
    <component
        :is="to ? 'router-link' : 'div'"
        :to="to"
        class="list-group-item bg-secondary bg-opacity-25 text-light"
        :class="{ 'list-group-item-action': action || to }"
    >
        <slot></slot>
    </component>
</template>


<style scoped>
.list-group-item-action:hover {
    background-color: rgba(var(--bs-secondary-rgb), 0.5) !important;
}
</style>