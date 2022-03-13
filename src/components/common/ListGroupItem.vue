<script setup lang="ts">

defineProps<{
    action?: boolean,
    to?: any
}>();

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