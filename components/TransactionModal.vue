<script setup lang="ts">
const emit = defineEmits(["save"]);

const props = defineProps<{
  tx: Transaction;
}>();

const open = ref(false);
const types = ref(["buy", "sell"]);
const isEdit = computed(() => !!props.tx.id);
const title = computed(() =>
  isEdit.value ? "edit-transaction" : "add-transaction"
);

const datetime = computed({
  get: () =>
    new Date(props.tx.timestamp ?? Date.now()).toISOString().slice(0, 16),
  set: (dt: string) => (props.tx.timestamp = new Date(dt).getTime()),
});

defineExpose({ open });
</script>

<template>
  <Modal :confirm-label="title" @confirm="emit('save', tx)" v-model:open="open">
    <template #title>{{ $t(title) }}</template>

    <div class="space-y-4">
      <div class="flex gap-4">
        <Radio
          v-for="type in types"
          :key="type"
          :value="type"
          v-model="tx.type"
          name="type" />
      </div>

      <Input :label="$t('date')" type="datetime-local" v-model="datetime" />

      <Input
        class="col"
        type="number"
        min="0"
        :label="$t('quantity')"
        v-model.number="tx.amount"
        autofocus />
      <Input
        class="col"
        type="number"
        min="0"
        :label="$t('price')"
        v-model.number="tx.price" />
    </div>
  </Modal>
</template>
