import * as React from "react"

import { cn } from "@/lib/utils"

/* Figma: Notifications/Alerts. Type = critical | warning.
   Fill = feedback/danger-default (--mg-danger) or feedback/warning-default (--mg-warning),
   text = primary/foreground, padding 16, radius 4, text 14/22 regular, -1% tracking. */

const alertTypes = {
  critical: "bg-[var(--mg-danger)]",
  warning: "bg-[var(--mg-warning)]",
} as const

function Alert({
  type = "critical",
  className,
  ...props
}: React.ComponentProps<"div"> & { type?: keyof typeof alertTypes }) {
  return (
    <div
      role="alert"
      data-slot="alert"
      data-type={type}
      className={cn(
        "flex w-full flex-col rounded-sm p-4 text-sm leading-[22px] tracking-[-0.01em] text-primary-foreground",
        alertTypes[type],
        className
      )}
      {...props}
    />
  )
}

export { Alert }
