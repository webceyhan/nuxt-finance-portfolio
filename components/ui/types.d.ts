type Size = "xs" | "sm" | "md" | "lg" | "xl";

type Variant =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "info"
  | "success"
  | "warning"
  | "error";

interface LinkProps {
  url?: any;
  label?: string;
  disabled?: boolean;
  active?: boolean;
}
