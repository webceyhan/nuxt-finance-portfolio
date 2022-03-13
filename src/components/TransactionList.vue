<script setup lang="ts">

import { Transaction } from '../api'
import ListGroup from './common/ListGroup.vue';
import ListGroupItem from './common/ListGroupItem.vue';
import { formatTimestamp, formatCurrency, getBalance } from '../utils';
import Button from './common/Button.vue';

const emit = defineEmits(['edit', 'remove']);

defineProps<{
    transactions: Transaction[]
}>();

</script>

<template>
    <div class="row text-muted small py-2 px-3">
        <div class="col-3">Type</div>
        <div class="col text-end">Amount</div>
        <div class="col text-end">Price</div>
        <div class="col text-end">Total</div>
        <div class="col">Actions</div>
    </div>

    <ListGroup>
        <ListGroupItem
            v-for="(tx, i) in transactions"
            :key="i"
            :tx="tx"
            @edit="emit('edit', tx)"
            @remove="emit('remove', tx)"
            action
        >
            <div class="row align-items-center">
                <div class="col-3">
                    <span class="text-capitalize">{{ tx.type }}</span>
                    <br />
                    <small class="text-muted">{{ formatTimestamp(tx.timestamp) }}</small>
                </div>

                <div class="col text-end">
                    <span class="badge bg-dark">{{ tx.amount }}</span>
                </div>

                <div class="col text-end">
                    <span class="badge bg-dark">{{ formatCurrency(tx.price) }}</span>
                </div>

                <div class="col text-end">
                    <span class="badge bg-dark">{{ formatCurrency(getBalance(tx as any)) }}</span>
                </div>

                <div class="col">
                    <Button variant="link" @click="emit('edit', tx)" sm>Edit</Button>
                    <Button variant="link" @click="emit('remove', tx)" sm>Delete</Button>
                </div>
            </div>
        </ListGroupItem>
    </ListGroup>
</template>