<script setup lang="ts">

defineProps<{
    flush?: boolean,
}>();

</script>

<template>
    <div class="list-group small" :class="{ 'list-group-item-flush': flush }">
        <slot></slot>
    </div>
</template>