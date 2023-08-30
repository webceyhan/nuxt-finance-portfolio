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
  <div class="flex py-2 px-6">
    <div class="w-4/12">Type</div>
    <div class="w-1/12 text-end">Amount</div>
    <div class="w-2/12 text-end">Price</div>
    <div class="w-2/12 text-end">Total</div>
    <div class="w-3/12 text-end"></div>
  </div>

  <ListGroup>
    <ListGroupItem
      v-for="(tx, i) in transactions"
      :key="i"
      :tx="tx"
      @edit="emit('edit', tx)"
      @remove="emit('remove', tx)"
      hoverable
      class="items-center"
    >
      <div class="w-4/12">
        <p class="capitalize">{{ tx.type }}</p>
        <span class="text-sm opacity-50">{{ formatTimestamp(tx.timestamp) }}</span>
      </div>

      <div class="w-1/12 text-end">
        <Badge>{{ tx.amount }}</Badge>
      </div>

      <div class="w-2/12 text-end">
        <Badge>{{ formatCurrency(tx.price) }}</Badge>
      </div>

      <div class="w-2/12 text-end">
        <Badge>{{ formatCurrency(getBalance(tx as any)) }}</Badge>
      </div>

      <div class="w-3/12 text-end">
        <Button size="sm" variant="link" @click="emit('edit', tx)">Edit</Button>
        <Button size="sm" variant="link" @click="emit('remove', tx)">Delete</Button>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>
