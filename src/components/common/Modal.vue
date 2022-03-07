<script setup lang="ts">

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
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer border-0" v-if="!noFooter">
                    <slot name="footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                            @click="emit('cancel')"
                        >Close</button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="emit('ok')"
                        >Save changes</button>
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