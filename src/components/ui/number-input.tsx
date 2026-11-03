"use client"

import * as React from "react"
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "cn"

import { useField } from "./field"

/* Figma: Forms/Input/Number. Field 38px high (small 30px), 1px border top/bottom/left, left radius 4,
   left-aligned value (16px side padding, small 8px), plus a 24px-wide stepper (up on top, down below)
   with 6x4 chevrons and right radius 4. States: enabled, hover (strong border), focused (info-strong ring),
   error, disabled. Works inside <Field> like Input (shared id, aria-describedby, invalid, disabled).
   Pass `format` for Intl.NumberFormat options, for example { minimumIntegerDigits: 2 } for "00". */

type NumberInputProps = Omit<NumberFieldPrimitive.Root.Props, "children"> & {
  size?: "default" | "sm"
  invalid?: boolean
  "aria-label"?: string
  "aria-describedby"?: string
  /** Extra classes for the text input (for example "px-1 text-center" in narrow fields). */
  inputClassName?: string
}

const stepButton =
  "flex flex-1 items-center justify-center border-input bg-[var(--mg-surface-input)] text-foreground outline-none transition-colors hover:bg-[var(--mg-surface-elevated-hover)] group-hover/num:border-[var(--mg-border-strong)] group-focus-within/num:border-ring group-data-[invalid]/num:border-[var(--mg-border-error)] [&_svg]:size-2.5"

function NumberInput({
  size = "default",
  invalid,
  disabled,
  id,
  className,
  inputClassName,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  ...props
}: NumberInputProps) {
  const field = useField()
  const isInvalid = invalid ?? !!field?.invalid
  const isDisabled = disabled ?? field?.disabled ?? false

  return (
    <NumberFieldPrimitive.Root
      data-slot="number-input"
      data-size={size}
      data-invalid={isInvalid || undefined}
      id={id ?? field?.id}
      disabled={isDisabled}
      className={cn("group/num w-full", className)}
      {...props}
    >
      <NumberFieldPrimitive.Group className="flex w-full items-stretch rounded-sm focus-within:ring-3 focus-within:ring-ring/50 group-data-[invalid]/num:focus-within:ring-[var(--mg-border-error)]/30 group-data-[disabled]/num:pointer-events-none group-data-[disabled]/num:opacity-[var(--mg-disabled-opacity)]">
        <NumberFieldPrimitive.Input
          aria-label={ariaLabel}
          aria-invalid={isInvalid || undefined}
          aria-describedby={
            ariaDescribedBy ?? (field ? `${field.descriptionId} ${field.helperId}` : undefined)
          }
          className={cn(
            "min-w-0 flex-1 rounded-l-sm border border-r-0 border-input bg-[var(--mg-surface-input)] text-sm leading-[22px] tracking-[-0.01em] text-foreground outline-none transition-colors group-hover/num:border-[var(--mg-border-strong)] group-focus-within/num:border-ring group-data-[invalid]/num:border-[var(--mg-border-error)] group-data-[size=default]/num:h-[38px] group-data-[size=default]/num:px-4 group-data-[size=sm]/num:h-[30px] group-data-[size=sm]/num:px-2",
            inputClassName
          )}
        />
        <div className="flex w-6 shrink-0 flex-col">
          <NumberFieldPrimitive.Increment
            aria-label="Increase"
            className={cn(stepButton, "rounded-tr-sm border-t border-r border-l")}
          >
            <ChevronUp aria-hidden />
          </NumberFieldPrimitive.Increment>
          <NumberFieldPrimitive.Decrement
            aria-label="Decrease"
            className={cn(stepButton, "rounded-br-sm border-r border-b border-l")}
          >
            <ChevronDown aria-hidden />
          </NumberFieldPrimitive.Decrement>
        </div>
      </NumberFieldPrimitive.Group>
    </NumberFieldPrimitive.Root>
  )
}

export { NumberInput }
