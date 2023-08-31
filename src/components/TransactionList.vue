<script setup lang="ts">
import { Transaction } from "../api";
import { formatTimestamp, getBalance } from "../utils";
import Badge from "./ui/Badge.vue";
import Button from "./ui/Button.vue";
import ListGroup from "./ui/ListGroup.vue";
import ListGroupItem from "./ui/ListGroupItem.vue";
import Money from "./ui/Money.vue";

const emit = defineEmits(["edit", "remove"]);

defineProps<{
  transactions: Transaction[];
}>();
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 py-2 px-6 opacity-50">
    <div class="">Type</div>
    <div class="max-md:hidden text-end">Price</div>
    <div class="text-end">Amount</div>
    <div class="max-md:hidden text-end"></div>
  </div>

  <ListGroup>
    <ListGroupItem
      v-for="(tx, i) in transactions"
      :key="i"
      :tx="tx"
      @edit="emit('edit', tx)"
      @remove="emit('remove', tx)"
      hoverable
      class="grid grid-cols-2 md:grid-cols-4 items-center"
    >
      <div class="flex flex-col">
        <span class="capitalize">{{ tx.type }}</span>
        <span class="text-sm opacity-50">{{ formatTimestamp(tx.timestamp) }}</span>
      </div>

      <div class="max-md:hidden text-end">
        <Money :value="tx.price" />
      </div>

      <div class="flex flex-col items-end text-end">
        <Money :value="getBalance(tx as any)" />
        <Badge>{{ tx.amount }} {{ tx.code }}</Badge>
      </div>

      <div class="max-md:hidden text-end">
        <Button size="sm" variant="link" @click="emit('edit', tx)">Edit</Button>
        <Button size="sm" variant="link" @click="emit('remove', tx)">Delete</Button>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>
