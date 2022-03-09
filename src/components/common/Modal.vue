<script setup lang="ts">
import Button from './Button.vue';

const emit = defineEmits(['ok', 'cancel']);

defineProps({
    noFooter: Boolean,
});

</script>

<template>
    <div class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-dark shadow">
                <div class="modal-header border-0">
                    <h5 class="modal-title">
                        <slot name="title"></slot>
                    </h5>
                    <Button data-bs-dismiss="modal" close />
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer border-0" v-if="!noFooter">
                    <slot name="footer">
                        <Button
                            variant="secondary"
                            data-bs-dismiss="modal"
                            @click="emit('cancel')"
                        >Close</Button>
                        <Button @click="emit('ok')">Save changes</Button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-content.shadow {
    box-shadow: 0 0.125rem 1rem rgba(143, 143, 143, 0.397) !important;
}
</style>