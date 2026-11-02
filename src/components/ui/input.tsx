import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useField } from "./field"

// Figma: Forms/Input/Text. The bordered box holds optional leading icon, the text input and an optional trailing icon.
// normal: 38px high, 16px side padding. small: 30px high, 8px side padding. Radius 4, 1px border, Body2.
const inputBoxVariants = cva(
  "flex w-full items-center gap-2 rounded-sm border border-input bg-[var(--mg-surface-input)] text-body-2 text-foreground transition-colors hover:border-[var(--mg-border-strong)] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 data-[disabled]:pointer-events-none data-[disabled]:opacity-[var(--mg-disabled-opacity)] data-[invalid]:border-[var(--mg-border-error)] data-[invalid]:hover:border-[var(--mg-border-error)] data-[invalid]:focus-within:border-[var(--mg-border-error)] data-[invalid]:focus-within:ring-[var(--mg-border-error)]/30 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        default: "h-[38px] px-4",
        sm: "h-[30px] px-2",
      },
    },
    defaultVariants: { size: "default" },
  }
)

function Input({
  className,
  size = "default",
  startIcon,
  endIcon,
  disabled,
  id,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> & {
  size?: "default" | "sm"
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}) {
  const field = useField()
  const invalid = ariaInvalid === true || ariaInvalid === "true" || !!field?.invalid
  const isDisabled = disabled ?? field?.disabled ?? false

  return (
    <div
      data-slot="input"
      data-disabled={isDisabled || undefined}
      data-invalid={invalid || undefined}
      className={cn(inputBoxVariants({ size }), className)}
    >
      {startIcon}
      <InputPrimitive
        id={id ?? field?.id}
        disabled={isDisabled}
        aria-invalid={invalid || undefined}
        aria-describedby={
          ariaDescribedBy ?? (field ? `${field.descriptionId} ${field.helperId}` : undefined)
        }
        className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
        {...props}
      />
      {endIcon}
    </div>
  )
}

export { Input }
