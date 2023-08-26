<script setup lang="ts">
import { Transaction } from "../api";
import { formatTimestamp, formatCurrency, getBalance } from "../utils";
import Badge from "./ui/Badge.vue";
import Button from "./ui/Button.vue";
import ListGroup from "./ui/ListGroup.vue";
import ListGroupItem from "./ui/ListGroupItem.vue";

const emit = defineEmits(["edit", "remove"]);

defineProps<{
  transactions: Transaction[];
}>();
</script>

<template>
  <div class="row text-body-tertiary small py-2 px-3">
    <div class="col-3">Type</div>
    <div class="col text-end">Amount</div>
    <div class="col text-end">Price</div>
    <div class="col text-end">Total</div>
    <div class="col text-center">Actions</div>
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
          <small class="text-body-tertiary">{{ formatTimestamp(tx.timestamp) }}</small>
        </div>

        <div class="col text-end">
          <Badge>{{ tx.amount }}</Badge>
        </div>

        <div class="col text-end">
          <Badge>{{ formatCurrency(tx.price) }}</Badge>
        </div>

        <div class="col text-end">
          <Badge>{{ formatCurrency(getBalance(tx as any)) }}</Badge>
        </div>

        <div class="col">
          <Button variant="link" @click="emit('edit', tx)">Edit</Button>
          <Button variant="link" @click="emit('remove', tx)">Delete</Button>
        </div>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>
