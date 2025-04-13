<script setup lang="ts">
/**
 * Dynamic classes
 *
 * Size:
 *  avatar-xs
 *  avatar-sm
 *  avatar-md
 *  avatar-lg
 *  avatar-xl
 */
defineProps<{
  src: string;
  size?: Size;
  withRing?: boolean;
}>();
</script>

<template>
  <div
    :class="{
      avatar: true,
      [`avatar-${size}`]: size,
    }">
    <!-- bugfix: !aspect-auto added to the div to avoid the image being stretched on the first render -->
    <div
      :class="{
        'rounded-full !aspect-auto': true,
        'ring ring-primary ring-offset-base-100 ring-offset-2': withRing,
      }">
      <img :src="src" referrerpolicy="no-referrer" />
    </div>
  </div>
</template>

<style scoped>
.avatar {
  --size-factor: 12; /* default */

  & > div {
    width: calc(var(--spacing) * var(--size-factor));
  }
}

.avatar-xs {
  --size-factor: 6;
}
.avatar-sm {
  --size-factor: 8;
}
.avatar-md {
  --size-factor: 12; /* default */
}
.avatar-lg {
  --size-factor: 16;
}
.avatar-xl {
  --size-factor: 24;
}
</style>
