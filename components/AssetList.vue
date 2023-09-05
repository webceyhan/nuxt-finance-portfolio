<script setup lang="ts">
import { Asset } from "~/server/types";

interface Props {
  assets: Asset[];
  compact?: boolean;
  class?: string;
}

defineEmits(["select"]);

const props = defineProps<Props>();

const sortBy = ref("rate");
const sortAsc = ref(true);

const sortedAssets = computed(() => sortData(props.assets, sortBy.value, sortAsc.value));
</script>

<template>
  <div v-if="!compact" class="grid grid-cols-2 sm:grid-cols-4 py-2 px-6">
    <div class="">
      <SortButton value="name" v-model:by="sortBy" v-model:asc="sortAsc">
        Name
      </SortButton>
    </div>
    <div class="max-sm:hidden text-end">
      <SortButton value="buying" v-model:by="sortBy" v-model:asc="sortAsc">
        Buy
      </SortButton>
    </div>
    <div class="max-sm:hidden text-end">Sell</div>
    <div class="max-sm:hidden text-end">
      <SortButton value="delta" v-model:by="sortBy" v-model:asc="sortAsc">
        Delta
      </SortButton>
    </div>
    <div class="sm:hidden text-end">
      <SortButton value="buying" v-model:by="sortBy" v-model:asc="sortAsc">
        Price
      </SortButton>
    </div>
  </div>

  <ListGroup :class="class">
    <ListGroupItem
      v-for="(asset, i) in sortedAssets"
      :key="i"
      @click="$emit('select', asset)"
      hoverable
    >
      <!-- compact version -->
      <template v-if="compact">
        <span>{{ asset.name }}</span>
        <span class="opacity-50">{{ asset.code }}</span>
      </template>

      <!-- full version -->
      <div v-else class="w-full grid grid-cols-2 sm:grid-cols-4">
        <div class="flex max-md:flex-col gap-x-2">
          <span>{{ asset.name }}</span>
          <span class="opacity-50">{{ asset.code }}</span>
        </div>

        <div class="max-sm:hidden text-end">
          <Money :value="asset.buying" />
        </div>

        <div class="max-sm:hidden text-end">
          <Money :value="asset.selling" />
        </div>

        <div
          class="max-sm:hidden text-end text-sm"
          :class="`text-${priceColor(asset.delta)}`"
        >
          {{ asset.delta.toFixed(2) }}%
        </div>

        <!-- mobile only -->
        <div class="sm:hidden text-end">
          <Money :value="asset.buying" />

          <div :class="`text-sm text-${priceColor(asset.delta)}`">
            {{ asset.delta.toFixed(2) }}%
          </div>
        </div>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>
