<script setup lang="ts">
const emit = defineEmits(["edit", "remove"]);

defineProps<{
  transactions: Transaction[];
}>();
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 py-2 px-6 opacity-50">
    <div class="">
      {{ $t("type") }}
    </div>
    <div class="max-md:hidden text-end">
      {{ $t("price") }}
    </div>
    <div class="text-end">
      {{ $t("amount") }}
    </div>
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
      class="grid grid-cols-2 md:grid-cols-4 items-start">
      <div class="flex flex-col">
        <span class="capitalize">{{ $t(tx.type) }}</span>
        <span class="text-sm opacity-50">{{ formatDate(tx.timestamp) }}</span>
      </div>

      <div class="max-md:hidden text-end">
        <Money :value="tx.price" />
      </div>

      <div class="flex flex-col items-end text-end">
        <Money :value="getBalance(tx as any)" />
        <Badge variant="primary" soft> {{ tx.amount }} {{ tx.code }} </Badge>
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
