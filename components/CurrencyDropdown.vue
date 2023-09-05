<script setup lang="ts">
import { CURRENCY_OPTIONS } from "~/constants";

const selectedIndex = ref(0);

const selectedOption = computed(() => CURRENCY_OPTIONS[selectedIndex.value]);

function onSelect(index: number) {
  selectedIndex.value = index;

  useCurrency().value = selectedOption.value.value;
}
</script>

<template>
  <Dropdown align-end>
    <template #label>
      <span class="max-md:hidden me-1">Currency</span>
      {{ selectedOption.emoji }}
    </template>

    <Menu class="w-52 bg-base-200" for-dropdown>
      <MenuLink
        v-for="(option, i) in CURRENCY_OPTIONS"
        :key="i"
        @click.prevent="onSelect(i)"
      >
        <span class="me-2"> {{ option.emoji }} </span>

        <span class="me-auto"> {{ option.label }} </span>

        <Icon
          name="check2"
          :class="{ 'opacity-0': option.value != selectedOption.value }"
        />
      </MenuLink>
    </Menu>
  </Dropdown>
</template>
