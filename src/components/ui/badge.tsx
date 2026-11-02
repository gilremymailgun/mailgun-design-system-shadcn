import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Figma: COMPONENTS > Badge/Tag/Label > Badge (Configuration = filled | outline)
// 24px high, radius/l (12px), Body2Medium (DM Sans 500, 14px), 8px side padding.
const badgeVariants = cva(
  "inline-flex h-6 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent px-2 text-body-2 leading-6 font-medium whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        // badge/color/filled/* -> surface/sunken + text/on-sunken
        filled: "bg-[var(--mg-surface-sunken)] text-[var(--mg-text-on-sunken)]",
        // badge/color/outline/* -> surface/tertiary + border/subtle + text/default
        outline: "border-border bg-card text-foreground",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
)

type BadgeStatus = "success" | "warning" | "danger" | "info"

// badge/color/*/pill/* -> feedback/*-default
const statusDot: Record<BadgeStatus, string> = {
  success: "bg-[var(--mg-success)]",
  warning: "bg-[var(--mg-warning)]",
  danger: "bg-[var(--mg-danger)]",
  info: "bg-[var(--mg-info)]",
}

function Badge({
  className,
  variant = "filled",
  status,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { status?: BadgeStatus }) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {status && (
        <span
          aria-hidden="true"
          className={cn("size-2 shrink-0 rounded-full", statusDot[status])}
        />
      )}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
export type { BadgeStatus }
