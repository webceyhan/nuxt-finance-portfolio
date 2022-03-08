<script setup lang="ts">

import { computed, PropType, ref } from 'vue';
import { Transaction } from '../api'
import Modal from './common/Modal.vue';

const emit = defineEmits(['save']);

const types = ref(['buy', 'sell']);

const props = defineProps({
    tx: {
        type: Object as PropType<Transaction>,
        required: true,
    },
});

const isEdit = computed(() => !!props.tx.id);
const title = computed(() => isEdit.value ? 'Edit Transaction' : 'Add Transaction');
const datetime = computed({
    get: () => (new Date(props.tx.timestamp ?? Date.now())).toISOString().slice(0, 16),
    set: (dt: string) => props.tx.timestamp = new Date(dt).getTime(),
});

</script>

<template>
    <Modal>
        <template #title>{{ title }}</template>

        <form>
            <div class="row mb-4">
                <div class="btn-group" role="group">
                    <template v-for="t in types">
                        <input
                            type="radio"
                            name="tx-type"
                            class="btn-check"
                            autocomplete="off"
                            :id="`tx-type-${t}`"
                            :value="t"
                            v-model="tx.type"
                        />
                        <label
                            class="btn btn-outline-secondary text-capitalize"
                            :for="`tx-type-${t}`"
                        >{{ t }}</label>
                    </template>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col">
                    <label for="date">Date</label>
                    <input
                        type="datetime-local"
                        name="date"
                        class="form-control"
                        v-model="datetime"
                    />
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <label for="qtty">Quantity</label>
                    <input
                        type="number"
                        class="form-control"
                        min="0"
                        id="qtty"
                        v-model.number="tx.amount"
                    />
                </div>
                <div class="col">
                    <label for="price">Price</label>
                    <input
                        type="number"
                        class="form-control"
                        min="0"
                        id="price"
                        v-model.number="tx.price"
                    />
                </div>
            </div>
        </form>

        <template #footer>
            <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                @click="emit('save', tx)"
            >{{ title }}</button>
        </template>
    </Modal>
</template>