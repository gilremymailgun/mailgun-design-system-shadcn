import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

/* Figma: Card (comp card/color/*), Card/Sub-elements/Section, Footer, Button row.
   Fill = surface/elevated (--card), border = border/subtle (--border), 1px.
   Figma corner radius is 3px (no token); we use radius/s = 4px. */

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex w-full flex-col rounded-sm border border-border bg-card text-card-foreground",
        className
      )}
      {...props}
    />
  )
}

/* Section: content padded 24px with 16px gap; optional 1px separator below.
   Children order in Figma: header (title + icon), banner, description. */
function CardSection({
  className,
  separator = true,
  ...props
}: React.ComponentProps<"div"> & { separator?: boolean }) {
  return (
    <div
      data-slot="card-section"
      className={cn(
        "flex flex-col gap-4 p-6",
        separator && "border-b border-border",
        className
      )}
      {...props}
    />
  )
}

/* Title row: title text fills, optional icon (CardCheck) at the end, 16px gap. */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex items-center gap-4", className)}
      {...props}
    />
  )
}

/* Figma: 16px Bold, 24px line height, text/default. */
function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("flex-1 text-base font-bold leading-6", className)}
      {...props}
    />
  )
}

/* Figma: 14px Regular, 20px line height, text/default. */
function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm leading-5", className)}
      {...props}
    />
  )
}

/* Figma: "cards/00 check", 24px filled circle. Default = feedback/neutral-strong.
   Success, warning and alert map to our feedback tokens. */
const checkColors = {
  default: "bg-[var(--mg-neutral-strong)]",
  success: "bg-[var(--mg-success-strong)]",
  warning: "bg-[var(--mg-warning-strong)]",
  alert: "bg-[var(--mg-danger-strong)]",
} as const

function CardCheck({
  state = "default",
  className,
  ...props
}: React.ComponentProps<"span"> & { state?: keyof typeof checkColors }) {
  return (
    <span
      data-slot="card-check"
      data-state={state}
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-background",
        checkColors[state],
        className
      )}
      {...props}
    >
      <Check className="size-[14px]" strokeWidth={3} aria-hidden />
    </span>
  )
}

/* Footer: 24px padding, 16px gap, stacks button row and alert. */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex flex-col gap-4 p-6", className)}
      {...props}
    />
  )
}

/* Button row: 8px gap, left (default) or right aligned. */
function CardActions({
  className,
  align = "left",
  ...props
}: React.ComponentProps<"div"> & { align?: "left" | "right" }) {
  return (
    <div
      data-slot="card-actions"
      className={cn(
        "flex items-center gap-2",
        align === "right" && "justify-end",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardSection,
  CardHeader,
  CardTitle,
  CardDescription,
  CardCheck,
  CardFooter,
  CardActions,
}
