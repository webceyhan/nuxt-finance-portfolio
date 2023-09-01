<script setup lang="ts">
import { computed, ref } from "vue";
import { Transaction } from "../api";
import Modal from "./ui/Modal.vue";
import Input from "./ui/Input.vue";
import Radio from "./ui/Radio.vue";

interface Props {
  tx: Transaction;
}

const emit = defineEmits(["save"]);

const props = defineProps<Props>();

const open = ref(false);
const types = ref(["buy", "sell"]);
const isEdit = computed(() => !!props.tx.id);
const title = computed(() => (isEdit.value ? "Edit Transaction" : "Add Transaction"));

const datetime = computed({
  get: () => new Date(props.tx.timestamp ?? Date.now()).toISOString().slice(0, 16),
  set: (dt: string) => (props.tx.timestamp = new Date(dt).getTime()),
});

defineExpose({ open });
</script>

<template>
  <Modal :confirm-label="title" @confirm="emit('save', tx)" v-model:open="open">
    <template #title>{{ title }}</template>

    <div class="space-y-4">
      <div class="flex gap-4">
        <Radio
          v-for="type in types"
          :key="type"
          :value="type"
          v-model="tx.type"
          name="type"
        />
      </div>

      <Input label="Date" type="datetime-local" v-model="datetime" />

      <Input
        class="col"
        type="number"
        min="0"
        label="Quantity"
        v-model.number="tx.amount"
        autofocus
      />
      <Input class="col" type="number" min="0" label="Price" v-model.number="tx.price" />
    </div>
  </Modal>
</template>
