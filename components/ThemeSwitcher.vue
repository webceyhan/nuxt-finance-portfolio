<script setup lang="ts">
const { isDark } = useTheme();
</script>

<template>
  <label class="swap swap-rotate btn btn-ghost">
    <!-- this hidden checkbox controls the state -->
    <input type="checkbox" v-model="isDark" />

    <Icon name="sun-fill" class="swap-off" />
    <Icon name="moon-fill" class="swap-on" />
  </label>
</template>
