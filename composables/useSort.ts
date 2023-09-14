interface SortConfig<T> {
    by: string;
    asc?: boolean;
    data: () => T[];
}

export function useSort<T>(config: SortConfig<T>) {
    const sortAsc = ref(config.asc ?? true);
    const sortBy = ref(config.by);

    const sortedData = computed(() =>
        sortData(config.data(), sortBy.value, sortAsc.value) as T[]
    );

    return {
        sortBy,
        sortAsc,
        sortedData,
    };
}
