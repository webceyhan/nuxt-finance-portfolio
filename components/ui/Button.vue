<script setup lang="ts">
/**
 * Dynamic classes
 *
 * Size:
 *  btn-xs
 *  btn-sm
 *  btn-md
 *  btn-lg
 *  btn-xl
 *
 * Variant:
 *  btn-neutral
 *  btn-primary
 *  btn-secondary
 *  btn-accent
 *  btn-ghost
 *  btn-info
 *  btn-success
 *  btn-warning
 *  btn-error
 */
defineProps<{
  size?: Size;
  variant?: Variant | "link";
  outlined?: boolean;
}>();

/**
 * bugfix: ref to vue component is not working on vue3
 * as a workaround, we use ref to store wrapper element
 * and expose it as a property to acces it.
 */
const root = ref<any>(null);

defineExpose({ root });
</script>

<template>
  <button
    ref="root"
    type="button"
    :class="{
      btn: true,
      [`btn-${size}`]: size,
      [`btn-${variant}`]: variant,
      'btn-outline': outlined,
    }">
    <slot />
  </button>
</template>
