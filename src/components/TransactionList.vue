<script setup lang="ts">
import { Transaction } from "../api";
import { formatTimestamp, getBalance } from "../utils";
import Badge from "./ui/Badge.vue";
import ListGroup from "./ui/ListGroup.vue";
import ListGroupItem from "./ui/ListGroupItem.vue";
import Money from "./ui/Money.vue";
import Menu from "./ui/Menu.vue";
import MenuLink from "./ui/MenuLink.vue";
import Icon from "./ui/Icon.vue";

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
      class="grid grid-cols-2 md:grid-cols-4 items-start"
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
        <Menu class="p-0" horizontal>
          <MenuLink @click.prevent="emit('edit', tx)">
            <Icon name="pencil" />
          </MenuLink>
          <MenuLink @click.prevent="emit('remove', tx)">
            <Icon name="trash" />
          </MenuLink>
        </Menu>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>
