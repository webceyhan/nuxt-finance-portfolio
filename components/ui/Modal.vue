<script setup lang="ts">
const emit = defineEmits(["update:open", "confirm", "close"]);

const props = defineProps<{
  open?: boolean;
  noAction?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
}>();

function close() {
  emit("close");
  emit("update:open", false);
}

function confirm() {
  emit("confirm");
  close();
}

watch(
  () => props.open,
  // autofocus the first input with autofocus attribute if any
  () => document.querySelector<HTMLElement>("input[autofocus]")?.focus()
);
</script>

<template>
  <dialog
    class="modal modal-bottom sm:modal-middle"
    :open="open"
    @close="close">
    <form
      method="dialog"
      class="modal-box ring-1 ring-primary shadow-lg space-y-8"
      novalidate>
      <!-- title -->
      <header class="flex justify-between items-center">
        <h3 class="font-bold text-xl">
          <slot name="title" />
        </h3>

        <!-- close button (must have no type) -->
        <Button :type="undefined" class="btn-circle" size="sm" outlined>
          ✕
        </Button>
      </header>

      <!-- content -->
      <div class="space-y-4">
        <slot />
      </div>

      <!-- action buttons -->
      <div v-if="!noAction" class="modal-action space-x-4">
        <slot name="action">
          <!-- if there is a button in form, it will close the modal -->
          <Button :type="undefined" outlined>
            {{ $t(cancelLabel ?? "cancel") }}
          </Button>

          <Button :type="undefined" variant="primary" @click="confirm">
            {{ $t(confirmLabel ?? "confirm") }}
          </Button>
        </slot>
      </div>
    </form>

    <!-- backdrop for closing the modal -->
    <form method="dialog" class="modal-backdrop bg-base-200/70">
      <button>{{ $t("close") }}</button>
    </form>
  </dialog>
</template>
