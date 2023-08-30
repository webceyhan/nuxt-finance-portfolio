export type Size = 'xs' | 'sm' | 'md' | 'lg';

export type Variant =
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'ghost'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';

export interface LinkProps {
    url?: any;
    label?: string;
    disabled?: boolean;
    active?: boolean;
}
