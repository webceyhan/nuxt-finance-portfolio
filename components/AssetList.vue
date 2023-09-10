<script setup lang="ts">
import { Asset } from "~/server/types";

interface Props {
  assets: Asset[];
  class?: string;
}

defineEmits(["select", "watch"]);

const props = defineProps<Props>();

const { sortAsc, sortBy, sortedData } = useSort<Asset>({
  by: "rate",
  data: () => props.assets,
});
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 py-2 px-6">
    <!-- TODO: add sortable rate column which should be default -->
    <div class="">
      <SortButton value="name" v-model:by="sortBy" v-model:asc="sortAsc">
        Name
      </SortButton>
    </div>
    <div class="max-md:hidden text-end">
      <SortButton value="buying" v-model:by="sortBy" v-model:asc="sortAsc">
        Buy
      </SortButton>
    </div>
    <div class="max-md:hidden text-end">
      <SortButton value="selling" v-model:by="sortBy" v-model:asc="sortAsc" disabled>
        Sell
      </SortButton>
    </div>
    <div class="max-md:hidden text-end">
      <SortButton value="delta" v-model:by="sortBy" v-model:asc="sortAsc">
        Delta
      </SortButton>
    </div>
    <div class="md:hidden text-end">
      <SortButton value="buying" v-model:by="sortBy" v-model:asc="sortAsc">
        Price
      </SortButton>
    </div>
  </div>

  <ListGroup :class="class">
    <ListGroupItem
      v-for="asset in sortedData"
      :key="asset.code"
      @click="$emit('select', asset)"
      hoverable
    >
      <div class="w-full grid grid-cols-2 md:grid-cols-4">
        <div class="flex items-start md:items-center gap-x-2 whitespace-nowrap">
          <!-- toggle favorite -->
          <label class="swap swap-flip me-2">
            <input
              type="checkbox"
              :checked="asset.watching"
              @change="$emit('watch', asset)"
            />
            <div class="swap-on">
              <Icon name="star-fill" class="text-warning/60" />
            </div>
            <div class="swap-off">
              <Icon name="star" class="text-warning/30" />
            </div>
          </label>

          <div class="flex max-md:flex-col gap-x-2">
            <span>{{ asset.name }}</span>
            <span class="opacity-50">{{ asset.code }}</span>
          </div>
        </div>

        <div class="max-md:hidden text-end">
          <Money :value="asset.buying" />
        </div>

        <div class="max-md:hidden text-end">
          <Money :value="asset.selling" />
        </div>

        <div
          class="max-md:hidden text-end text-sm"
          :class="`text-${priceColor(asset.delta)}`"
        >
          {{ asset.delta.toFixed(2) }}%
        </div>

        <!-- mobile only -->
        <div class="md:hidden text-end">
          <Money :value="asset.buying" />

          <div :class="`text-sm text-${priceColor(asset.delta)}`">
            {{ asset.delta.toFixed(2) }}%
          </div>
        </div>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>
