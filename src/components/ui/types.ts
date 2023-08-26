export type Size = 'sm' | 'md' | 'lg';

export type Variant =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link';

export interface LinkProps {
    url?: any;
    label?: string;
    disabled?: boolean;
    active?: boolean;
}
