<script setup lang="ts">
import { computed, ref } from "vue";
import { Transaction } from "../api";
import Modal from "./ui/Modal.vue";
import Input from "./ui/Input.vue";
import RadioGroup from "./ui/RadioGroup.vue";
import Button from "./ui/Button.vue";

const emit = defineEmits(["save"]);

const types = ref(["buy", "sell"]);

const props = defineProps<{
  tx: Transaction;
}>();

const isEdit = computed(() => !!props.tx.id);
const title = computed(() => (isEdit.value ? "Edit Transaction" : "Add Transaction"));
const datetime = computed({
  get: () => new Date(props.tx.timestamp ?? Date.now()).toISOString().slice(0, 16),
  set: (dt: string) => (props.tx.timestamp = new Date(dt).getTime()),
});
</script>

<template>
  <Modal>
    <template #title>{{ title }}</template>

    <form>
      <div class="row mb-4">
        <RadioGroup :options="types" v-model="tx.type" />
      </div>

      <div class="row">
        <Input label="Date" type="datetime-local" v-model="datetime" />
      </div>

      <div class="row">
        <Input
          class="col"
          type="number"
          min="0"
          label="Quantity"
          v-model.number="tx.amount"
        />
        <Input
          class="col"
          type="number"
          min="0"
          label="Price"
          v-model.number="tx.price"
        />
      </div>
    </form>

    <template #footer>
      <Button data-bs-dismiss="modal" @click="emit('save', tx)">{{ title }}</Button>
    </template>
  </Modal>
</template>
