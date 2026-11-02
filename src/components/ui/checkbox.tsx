import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { Check, Minus } from "lucide-react"

import { cn } from "@/lib/utils"

// Figma: Form > Checkbox. 16px, radius 4, 1px border-strong; checked/partial = primary fill with active border.
// Disabled = 30% opacity (Figma sets opacity on the whole control).
function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "group/checkbox relative flex size-4 shrink-0 items-center justify-center rounded-sm border border-[var(--mg-border-strong)] bg-[var(--mg-surface-input)] text-primary-foreground outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 data-[checked]:border-ring data-[checked]:bg-primary data-[indeterminate]:border-ring data-[indeterminate]:bg-primary data-[disabled]:cursor-not-allowed data-[disabled]:opacity-[var(--mg-disabled-opacity)] aria-invalid:border-[var(--mg-border-error)]",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center"
      >
        <Check className="size-3 group-data-[indeterminate]/checkbox:hidden" strokeWidth={3} />
        <Minus className="hidden size-3 group-data-[indeterminate]/checkbox:block" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
