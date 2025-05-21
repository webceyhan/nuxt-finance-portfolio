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

    <Fieldset grid>
      <Field
        type="radio"
        :label="$t('type')"
        :values="types"
        v-model="tx.type" />

      <Field :label="$t('date')" type="datetime-local" v-model="datetime" />

      <Field
        type="number"
        :label="$t('quantity')"
        v-model.number="tx.amount"
        min="0"
        autofocus />

      <Field
        type="number"
        :label="$t('price')"
        min="0"
        v-model.number="tx.price" />
    </Fieldset>
  </Modal>
</template>
