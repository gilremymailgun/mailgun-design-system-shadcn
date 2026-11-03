import * as React from "react"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

// Figma: Pagination. Compose a left and right group inside <Pagination> (it spreads them apart):
// Complete = [page size + summary] ... [controls]; Mirrored = [controls] ... [page size]; No Toggle = [controls] only.
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("flex w-full items-center justify-between gap-3", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="pagination-content" className={cn("flex items-center gap-1", className)} {...props} />
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" className={cn("flex", className)} {...props} />
}

// Item: 24px high, min 27px wide, 4px radius, Caption (12px), primary text.
// Hover and current page = accent fill; pressed = secondary-active.
function PaginationLink({
  className,
  isActive,
  icon,
  ...props
}: React.ComponentProps<"a"> & { isActive?: boolean; icon?: boolean }) {
  return (
    <a
      data-slot="pagination-link"
      aria-current={isActive ? "page" : undefined}
      data-active={isActive || undefined}
      className={cn(
        "inline-flex items-center justify-center h-8 rounded-sm py-[5px] text-sm leading-[22px] tracking-[-0.01em] text-primary outline-none transition-colors hover:bg-accent active:bg-[var(--mg-surface-secondary-active)] focus-visible:ring-3 focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-[var(--mg-disabled-opacity)] data-[active]:bg-accent [&_svg]:size-4 [&_svg]:shrink-0",
        icon ? "px-[5.5px]" : "min-w-[27px] px-[10px]",
        className
      )}
      {...props}
    />
  )
}

function PaginationFirst(props: React.ComponentProps<"a">) {
  return (
    <PaginationLink icon aria-label="Go to first page" {...props}>
      <ArrowLeft />
    </PaginationLink>
  )
}

function PaginationPrevious(props: React.ComponentProps<"a">) {
  return (
    <PaginationLink icon aria-label="Go to previous page" {...props}>
      <ChevronLeft />
    </PaginationLink>
  )
}

function PaginationNext(props: React.ComponentProps<"a">) {
  return (
    <PaginationLink icon aria-label="Go to next page" {...props}>
      <ChevronRight />
    </PaginationLink>
  )
}

function PaginationLast(props: React.ComponentProps<"a">) {
  return (
    <PaginationLink icon aria-label="Go to last page" {...props}>
      <ArrowRight />
    </PaginationLink>
  )
}

// "1-2 of 2": Body2, muted.
function PaginationSummary({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="pagination-summary"
      className={cn("text-sm leading-[22px] tracking-[-0.01em] text-muted-foreground", className)}
      {...props}
    />
  )
}

// Page size toggle (Figma: outlined toggle group 10 / 20 / 30). 36px high, 16px padding, --ring borders,
// selected = secondary-active fill. Joined with overlapping 1px borders.
function PaginationPageSize({
  className,
  sizes,
  value,
  onValueChange,
  label = "Items per page",
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> & {
  sizes: number[]
  value: number
  onValueChange?: (value: number) => void
  label?: string
}) {
  return (
    <div
      role="group"
      aria-label={label}
      data-slot="pagination-page-size"
      className={cn("inline-flex", className)}
      {...props}
    >
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          aria-pressed={size === value}
          onClick={() => onValueChange?.(size)}
          className="relative -ml-px inline-flex items-center border border-ring bg-card px-4 py-2 text-body-2 leading-[18px] text-primary outline-none transition-colors first:ml-0 first:rounded-l-sm last:rounded-r-sm hover:bg-accent focus-visible:z-10 focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:z-10 aria-pressed:bg-[var(--mg-surface-secondary-active)] aria-pressed:hover:bg-[var(--mg-surface-secondary-active)]"
        >
          {size}
        </button>
      ))}
    </div>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationFirst,
  PaginationPrevious,
  PaginationNext,
  PaginationLast,
  PaginationSummary,
  PaginationPageSize,
}
