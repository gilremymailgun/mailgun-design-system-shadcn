import * as React from "react"
import { ArrowLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

// Figma: Breadcrumbs. 22px high, Body2, optional 16px icon (8px gap), 16px chevron separator 8px after the text.
// Default text = muted-foreground, hover = interactive blue; current page = interactive blue, no separator.
function Breadcrumb(props: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("flex flex-wrap items-center text-body-2", className)}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center", className)}
      {...props}
    />
  )
}

const itemClasses =
  "inline-flex items-center gap-2 rounded-sm [&_svg]:size-4 [&_svg]:shrink-0"

function BreadcrumbLink({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="breadcrumb-link"
      className={cn(
        itemClasses,
        "text-muted-foreground outline-none transition-colors hover:text-[var(--mg-text-interactive)] focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn(itemClasses, "text-[var(--mg-text-interactive)]", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({ className, children, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("ml-2 inline-flex text-muted-foreground [&_svg]:size-4", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

// Figma: Breadcrumbs, Type = Back. Left arrow plus label in the interactive color.
function BreadcrumbBack({ className, children = "Back", ...props }: React.ComponentProps<"a">) {
  return (
    <a
      data-slot="breadcrumb-back"
      className={cn(
        itemClasses,
        "text-body-2 text-[var(--mg-text-interactive)] outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
      {...props}
    >
      <ArrowLeft />
      {children}
    </a>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbBack,
}
