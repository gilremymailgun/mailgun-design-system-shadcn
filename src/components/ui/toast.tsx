import * as React from "react"
import { CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

/* Figma: Notifications/Toasts. Type = default | error | success | warning
   (Figma spells it "Succes"; code uses "success").
   Fill = feedback/neutral-strong (--mg-neutral-strong), error = feedback/danger-default
   (--mg-danger). Success and warning share the neutral fill; only the icon differs.
   Text and icon = primary/foreground. Padding 16/12, radius 4, gap 16, text 14/22,
   shadow 0 1px 2px rgba(0,0,2,.2). */

const toastTypes = {
  default: { fill: "bg-[var(--mg-neutral-strong)]", Icon: Info },
  error: { fill: "bg-[var(--mg-danger)]", Icon: CircleX },
  success: { fill: "bg-[var(--mg-neutral-strong)]", Icon: CircleCheck },
  warning: { fill: "bg-[var(--mg-neutral-strong)]", Icon: CircleAlert },
} as const

type ToastProps = Omit<React.ComponentProps<"div">, "type"> & {
  type?: keyof typeof toastTypes
  /** Hide the leading icon (Figma: hasIcon). Default true. */
  icon?: boolean
  /** Label of the optional action button. */
  action?: React.ReactNode
  onAction?: () => void
  /** When set, a close button is shown and calls this handler. */
  onClose?: () => void
}

function Toast({
  type = "default",
  icon = true,
  action,
  onAction,
  onClose,
  className,
  children,
  ...props
}: ToastProps) {
  const { fill, Icon } = toastTypes[type]
  return (
    <div
      role={type === "error" ? "alert" : "status"}
      data-slot="toast"
      data-type={type}
      className={cn(
        "flex w-[292px] max-w-full items-center gap-4 rounded-sm px-4 py-3 text-sm leading-[22px] tracking-[-0.01em] text-primary-foreground shadow-[0_1px_2px_rgba(0,0,2,0.2)]",
        fill,
        className
      )}
      {...props}
    >
      {icon && <Icon className="size-4 shrink-0" aria-hidden />}
      <div data-slot="toast-message" className="min-w-0 flex-1">
        {children}
      </div>
      {action && (
        <Button
          variant="tertiary"
          className="h-[30px] shrink-0 px-3 py-1"
          onClick={onAction}
        >
          {action}
        </Button>
      )}
      {onClose && (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="inline-flex size-4 shrink-0 items-center justify-center rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-primary-foreground/60"
        >
          <X className="size-3" aria-hidden />
        </button>
      )}
    </div>
  )
}

export { Toast }
