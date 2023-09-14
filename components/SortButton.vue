<script setup lang="ts">
interface Props {
  by: string;
  asc: boolean;
  value: string;
  disabled?: boolean;
}

const emit = defineEmits(["update:by", "update:asc"]);

const props = defineProps<Props>();

const active = computed(() => props.value === props.by);

const onToggle = () => {
  if (active.value) {
    return emit("update:asc", !props.asc);
  }

  emit("update:by", props.value);
  emit("update:asc", true);
};
</script>

<template>
  <Button
    size="xs"
    variant="link"
    @click="onToggle"
    class="no-underline p-0"
    :class="{
      '!bg-transparent !text-opacity-100 opacity-50': disabled,
    }"
    :disabled="disabled"
  >
    <!-- actie state -->
    <template v-if="active">
      <Icon v-if="asc" name="sort-down" />
      <Icon v-else name="sort-up" />
    </template>

    <!-- idle state -->
    <Icon v-else name="sort-down" :class="disabled ? 'opacity-0' : 'opacity-50'" />

    <slot />
  </Button>
</template>
