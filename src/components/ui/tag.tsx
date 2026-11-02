import * as React from "react"
import { cva } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

type TagStatus = "success" | "warning" | "danger" | "info"

// tag/color/enabled/pill/* -> feedback/*-default
const statusDot: Record<TagStatus, string> = {
  success: "bg-[var(--mg-success)]",
  warning: "bg-[var(--mg-warning)]",
  danger: "bg-[var(--mg-danger)]",
  info: "bg-[var(--mg-info)]",
}

// Figma: Badge/Tag/Label > Tag and Label (identical look; Tag is removable).
// Without onRemove this is Figma's "Label" (informational).
// 30px high, 4px radius, 8px side padding, Body2 Regular, sunken surface.
function Tag({
  className,
  icon,
  status,
  onRemove,
  removeLabel = "Remove",
  children,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  children: React.ReactNode
  icon?: React.ReactNode
  status?: TagStatus
  onRemove?: () => void
  removeLabel?: string
}) {
  return (
    <span
      data-slot="tag"
      className={cn(
        "inline-flex h-[30px] shrink-0 items-center gap-1 rounded-sm bg-[var(--mg-surface-sunken)] px-2 text-body-2 font-normal whitespace-nowrap text-[var(--mg-text-on-sunken)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {icon}
      {status && (
        <span
          aria-hidden="true"
          className={cn("size-2 shrink-0 rounded-full", statusDot[status])}
        />
      )}
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={onRemove}
          className="inline-flex size-4 items-center justify-center rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <X className="size-3" />
        </button>
      )}
    </span>
  )
}

type Release = "beta" | "alpha" | "dev" | "new" | "upgrade"

// Figma: Navigation > MainNav > submenu-item/tag. 20px high, 3px radius, Regular 12/20.
const releaseVariants = cva(
  "inline-flex h-5 shrink-0 items-center rounded-[3px] px-1 text-xs leading-5 font-normal whitespace-nowrap text-[var(--mg-text-on-tag)] uppercase",
  {
    variants: {
      release: {
        beta: "bg-[var(--mg-tag-beta)]",
        alpha: "bg-[var(--mg-tag-alpha)]",
        dev: "bg-[var(--mg-tag-dev)]",
        new: "bg-[var(--mg-tag-new)]",
        upgrade: "bg-[var(--mg-tag-upgrade)]",
      },
    },
  }
)

function ReleaseTag({
  className,
  release,
  children,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  release: Release
  children?: React.ReactNode
}) {
  return (
    <span
      data-slot="release-tag"
      className={cn(releaseVariants({ release }), className)}
      {...props}
    >
      {children ?? release}
    </span>
  )
}

export { Tag, ReleaseTag, releaseVariants }
export type { TagStatus, Release }
