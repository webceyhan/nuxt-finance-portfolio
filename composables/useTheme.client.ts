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

            // set theme on <html> element
            useHead({ htmlAttrs: { 'data-theme': theme.value } });
        },
    });

    return {
        theme,
        isDark,
    };
}
