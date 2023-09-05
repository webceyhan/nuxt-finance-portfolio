<script setup lang="ts">
interface Props {
  by: string;
  asc: boolean;
  value: string;
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
  <Button size="xs" variant="link" @click="onToggle">
    <!-- actie state -->
    <template v-if="active">
      <Icon v-if="asc" name="sort-down" />
      <Icon v-else name="sort-up" />
    </template>

    <!-- idle state -->
    <Icon v-else name="sort-down" class="opacity-50" />

    <slot />
  </Button>
</template>
