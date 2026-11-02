import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  )
}

// Figma: Form > Radio. 16px circle, 1px border-strong; checked = primary fill, 8px primary-foreground dot.
function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "relative flex size-4 shrink-0 items-center justify-center rounded-full border border-[var(--mg-border-strong)] bg-[var(--mg-surface-input)] outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 data-[checked]:border-primary data-[checked]:bg-primary data-[disabled]:cursor-not-allowed data-[disabled]:opacity-[var(--mg-disabled-opacity)] aria-invalid:border-[var(--mg-border-error)]",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="size-2 rounded-full bg-primary-foreground"
      />
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
