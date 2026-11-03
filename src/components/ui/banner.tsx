import * as React from "react"
import {
  CircleCheck,
  Info,
  Lightbulb,
  TriangleAlert,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"

/* Figma: Notifications/Banner. Type = info | warning | success | error | tip.
   Fill = feedback/*-subtle, border = feedback/*-default with --mg-feedback-border-width
   (0 in light, 1px in dark). Text and icon = text/default. Padding 16, radius 4,
   icon + content gap 16, content-to-close gap 28, title/body/actions gap 8/16. */

const bannerTypes = {
  info: {
    classes:
      "bg-[var(--mg-info-subtle)] border-[var(--mg-info)]",
    Icon: Info,
  },
  warning: {
    classes:
      "bg-[var(--mg-warning-subtle)] border-[var(--mg-warning)]",
    Icon: TriangleAlert,
  },
  success: {
    classes:
      "bg-[var(--mg-success-subtle)] border-[var(--mg-success)]",
    Icon: CircleCheck,
  },
  error: {
    classes:
      "bg-[var(--mg-danger-subtle)] border-[var(--mg-danger)]",
    Icon: TriangleAlert,
  },
  tip: {
    classes:
      "bg-[var(--mg-neutral-subtle)] border-[var(--mg-neutral)]",
    Icon: Lightbulb,
  },
} as const

type BannerProps = Omit<React.ComponentProps<"div">, "title"> & {
  type?: keyof typeof bannerTypes
  title?: React.ReactNode
  /** Button row below the body text. */
  actions?: React.ReactNode
  /** When set, a close button is shown and calls this handler. */
  onClose?: () => void
}

function Banner({
  type = "info",
  title,
  actions,
  onClose,
  className,
  children,
  ...props
}: BannerProps) {
  const { classes, Icon } = bannerTypes[type]
  return (
    <div
      role={type === "error" || type === "warning" ? "alert" : "status"}
      data-slot="banner"
      data-type={type}
      className={cn(
        "flex w-full items-start gap-7 rounded-sm border-[length:var(--mg-feedback-border-width)] p-4 text-foreground",
        classes,
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <span className="flex size-5 shrink-0 items-center justify-center">
          <Icon className="size-4" aria-hidden />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {title && (
            <div
              data-slot="banner-title"
              className="text-base font-medium leading-6 tracking-[-0.01em]"
            >
              {title}
            </div>
          )}
          <div className="flex flex-col gap-4">
            <div
              data-slot="banner-body"
              className="text-sm leading-[22px] tracking-[-0.01em]"
            >
              {children}
            </div>
            {actions && (
              <div data-slot="banner-actions" className="flex items-center gap-2">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="inline-flex size-4 shrink-0 items-center justify-center rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <X className="size-3" aria-hidden />
        </button>
      )}
    </div>
  )
}

export { Banner }
