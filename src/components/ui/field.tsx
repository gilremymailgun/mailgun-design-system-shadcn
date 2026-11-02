import * as React from "react"
import { CircleAlert, Info } from "lucide-react"

import { cn } from "@/lib/utils"

type FieldContextValue = {
  id: string
  descriptionId: string
  helperId: string
  invalid: boolean
  disabled: boolean
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

function useField() {
  return React.useContext(FieldContext)
}

// Figma: Forms/Input/Text. Vertical stack, 8px gap: label row, custom text, control, helper row.
// Disabled dims the whole field to 30% (label, text, helper and the control itself).
function Field({
  className,
  invalid = false,
  disabled = false,
  children,
  ...props
}: React.ComponentProps<"div"> & { invalid?: boolean; disabled?: boolean }) {
  const id = React.useId()
  const value = React.useMemo(
    () => ({ id, descriptionId: `${id}-description`, helperId: `${id}-helper`, invalid, disabled }),
    [id, invalid, disabled]
  )
  return (
    <FieldContext.Provider value={value}>
      <div
        data-slot="field"
        data-disabled={disabled || undefined}
        data-invalid={invalid || undefined}
        className={cn("group/field flex w-full flex-col gap-2", className)}
        {...props}
      >
        {children}
      </div>
    </FieldContext.Provider>
  )
}

// Label row: Body2 Medium label, optional marker (Caption), info icon.
function FieldLabel({
  className,
  optional,
  hint,
  htmlFor,
  children,
  ...props
}: React.ComponentProps<"label"> & { optional?: React.ReactNode; hint?: string }) {
  const field = useField()
  return (
    <div className="flex items-center gap-2 group-data-[disabled]/field:opacity-[var(--mg-disabled-opacity)]">
      <label
        data-slot="field-label"
        htmlFor={htmlFor ?? field?.id}
        className={cn("text-body-2 leading-5 font-medium text-foreground", className)}
        {...props}
      >
        {children}
      </label>
      {optional && <span className="text-caption text-foreground">{optional}</span>}
      {hint && (
        <span role="img" aria-label={hint} title={hint} className="inline-flex text-foreground">
          <Info className="size-4" />
        </span>
      )}
    </div>
  )
}

// "Additional custom text": Caption text between the label and the control.
function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  const field = useField()
  return (
    <p
      data-slot="field-description"
      id={field?.descriptionId}
      className={cn("text-caption text-foreground group-data-[disabled]/field:opacity-[var(--mg-disabled-opacity)]", className)}
      {...props}
    />
  )
}

// Helper row under the control: help text, optional counter on the right.
// Invalid: text and icon use the error color.
function FieldHelper({
  className,
  counter,
  children,
  ...props
}: React.ComponentProps<"div"> & { counter?: React.ReactNode }) {
  const field = useField()
  const invalid = !!field?.invalid
  return (
    <div
      data-slot="field-helper"
      id={field?.helperId}
      role={invalid ? "alert" : undefined}
      className={cn(
        "flex items-center gap-1 text-caption group-data-[disabled]/field:opacity-[var(--mg-disabled-opacity)]",
        invalid ? "text-[var(--mg-text-error)]" : "text-foreground",
        className
      )}
      {...props}
    >
      {invalid && <CircleAlert className="size-4 shrink-0" aria-hidden="true" />}
      <span className="min-w-0 flex-1">{children}</span>
      {counter && <span className="ml-auto text-foreground">{counter}</span>}
    </div>
  )
}

export { Field, FieldLabel, FieldDescription, FieldHelper, useField }
