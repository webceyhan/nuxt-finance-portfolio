<script setup lang="ts">

import { PropType, ref } from 'vue';
import { Transaction } from '../api'
import Modal from './common/Modal.vue';

const emit = defineEmits(['save']);

const types = ref(['buy', 'sell']);

defineProps({
    tx: {
        type: Object as PropType<Transaction>,
        default: () => ({
            id: '',
            type: 'buy',
            price: 0,
            amount: 0,
            timestamp: Date.now(),
        })
    },
});

</script>

<template>
    <Modal>
        <template #title>Edit Transaction</template>

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
            >Edit Transaction</button>
        </template>
    </Modal>
</template>