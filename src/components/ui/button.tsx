import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { LoaderCircle } from "lucide-react"

import { cn } from "@/lib/utils"

// Mailgun Button, matched to Figma "Buttons/Button" (file VpOw02Le5ZJP2IMFMKMJj3):
// 4px radius, DM Sans Regular 14/22, default 38px tall (px-4), small 30px tall (px-3),
// icon-only 36px / 32px. Figma "primary" is the `default` variant here.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-sm border border-transparent bg-clip-padding text-body-2 font-normal whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-[var(--mg-disabled-opacity)] aria-busy:pointer-events-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Figma: primary
        default:
          "bg-primary text-primary-foreground hover:bg-[var(--mg-primary-hover)] active:bg-[var(--mg-primary-active)]",
        // Figma: brand
        brand:
          "bg-[var(--mg-brand)] text-[var(--mg-text-on-brand)] hover:bg-[var(--mg-brand-solid-hover)] active:bg-[var(--mg-brand-solid-active)]",
        // Figma: secondary (blue outline)
        secondary:
          "border-primary bg-card text-primary hover:bg-accent active:bg-[var(--mg-surface-secondary-active)]",
        // Figma: secondary dark (grey outline)
        "secondary-dark":
          "border-border bg-card text-foreground hover:bg-[var(--mg-surface-tertiary-hover)] active:bg-[var(--mg-surface-tertiary-active)]",
        // Figma: secondary neutral (grey fill)
        "secondary-neutral":
          "bg-[var(--mg-surface-subtle)] text-[var(--mg-text-on-subtle)] hover:bg-[var(--mg-surface-subtle-hover)] active:bg-[var(--mg-surface-subtle-active)]",
        // Figma: tertiary
        tertiary:
          "bg-card text-muted-foreground hover:bg-[var(--mg-surface-tertiary-hover)] active:bg-[var(--mg-surface-tertiary-active)]",
        // Figma: destructive. Hover/active darken (Figma's lighter hover fails contrast with white text).
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-[color-mix(in_oklab,var(--destructive),var(--foreground)_12%)] active:bg-[color-mix(in_oklab,var(--destructive),var(--foreground)_24%)]",
        // Not in Figma: kept so other shadcn components that use these variants keep working.
        outline:
          "border-border bg-card text-foreground hover:bg-[var(--mg-surface-tertiary-hover)] active:bg-[var(--mg-surface-tertiary-active)]",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // Figma: default (38px) and small (30px); icon-only 36px and 32px
        default: "h-[38px] px-4",
        sm: "h-[30px] px-3",
        icon: "size-9",
        "icon-sm": "size-8",
        // Not in Figma: kept for shadcn compatibility
        xs: "h-6 px-2 text-xs",
        lg: "h-10 px-5",
        "icon-xs": "size-6",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  loading = false,
  onClick,
  children,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & { loading?: boolean }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      aria-busy={loading || undefined}
      onClick={loading ? undefined : onClick}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading && <LoaderCircle className="animate-spin" aria-hidden="true" />}
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
