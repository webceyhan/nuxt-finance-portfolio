type Theme = 'light' | 'dark';

export function useTheme() {
    // state
    const theme = useState<Theme>('theme', () => 'dark');

    // getters
    const isDark = computed({
        get: () => {
            return theme.value === 'dark';
        },
        set: (val) => {
            theme.value = val ? 'dark' : 'light';
        },
    });

    // watcher
    watch(theme, (value) => {
        useHead({
            htmlAttrs: { 'data-theme': value },
        });
    });

    return {
        theme,
        isDark,
    };
}
