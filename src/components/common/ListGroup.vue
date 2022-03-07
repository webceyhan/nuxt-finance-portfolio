<script setup lang="ts">

defineProps({
    flush: Boolean,
});

</script>

<template>
    <div class="list-group small" :class="{ 'list-group-item-flush': flush }">
        <slot></slot>
    </div>
</template>