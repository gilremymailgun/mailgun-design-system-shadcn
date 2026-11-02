import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ChevronDown, ChevronRight, ChevronUp, Lock } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

// Figma: Accordion > Item. Card surface, 1px bottom border.
// locked = cannot be opened (Figma "Locked"); shows a lock instead of the chevron.
// variant "link" = no surface or border, for use with AccordionLinkTrigger (Figma "Link Accordion").
function AccordionItem({
  className,
  variant = "default",
  locked = false,
  ...props
}: AccordionPrimitive.Item.Props & { variant?: "default" | "link"; locked?: boolean }) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      data-variant={variant}
      data-locked={locked || undefined}
      disabled={locked || props.disabled}
      className={cn(
        "group/accordion-item",
        variant === "default" && "border-b border-border bg-card",
        className
      )}
      {...props}
    />
  )
}

// Header row: 16px padding, optional leading icon, bold Body2 title, optional badge and chevron on the right.
// Hover = elevated-hover fill; expanded = primary-active fill and an up chevron.
function AccordionTrigger({
  className,
  icon,
  badge,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props & { icon?: React.ReactNode; badge?: React.ReactNode }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/trigger flex w-full items-center gap-2 p-4 text-left text-body-2 leading-6 font-bold text-foreground outline-none transition-colors hover:bg-[var(--mg-surface-elevated-hover)] aria-expanded:bg-[var(--mg-surface-primary-active)] aria-expanded:hover:bg-[var(--mg-surface-primary-active)] focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50 group-data-[locked]/accordion-item:cursor-not-allowed group-data-[locked]/accordion-item:hover:bg-transparent [&_svg]:size-4 [&_svg]:shrink-0",
          className
        )}
        {...props}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2">
          {icon}
          {children}
        </span>
        <span className="flex shrink-0 items-center gap-4">
          {badge}
          <ChevronDown className="group-aria-expanded/trigger:hidden group-data-[locked]/accordion-item:hidden" />
          <ChevronUp className="hidden group-aria-expanded/trigger:block group-data-[locked]/accordion-item:hidden" />
          <Lock className="hidden group-data-[locked]/accordion-item:block" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

// Figma: "Link Accordion". A chevron plus a primary-colored label.
function AccordionLinkTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-link-trigger"
        className={cn(
          "group/trigger inline-flex items-center gap-1 text-body-2 text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:size-4 [&_svg]:shrink-0",
          className
        )}
        {...props}
      >
        <ChevronRight className="group-aria-expanded/trigger:hidden" />
        <ChevronDown className="hidden group-aria-expanded/trigger:block" />
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

// Body: Body2 text with 16px padding (override padding through className, for example on a link accordion).
function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-[var(--accordion-panel-height)] overflow-hidden text-body-2 text-foreground transition-[height] duration-200 data-[starting-style]:h-0 data-[ending-style]:h-0"
      {...props}
    >
      <div className={cn("p-4", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionLinkTrigger, AccordionContent }
