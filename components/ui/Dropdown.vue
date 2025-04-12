<script setup lang="ts">
interface Props {
  hover?: boolean;
  alignEnd?: boolean;
  labelClass?: string;
}

defineProps<Props>();
</script>

<template>
  <div
    :class="{
      dropdown: true,
      'dropdown-hover': hover,
      'dropdown-end': alignEnd,
    }"
  >
    <div tabindex="0" role="button" :class="`btn ${labelClass ?? 'btn-ghost'}`">
      <slot name="label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </slot>
    </div>

    <slot />
  </div>
</template>
