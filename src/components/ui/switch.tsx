import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

// Figma: Form > Switch. Track 32x12 (full radius), 16px handle that overhangs the track.
// Off = neutral track, on = primary track. Disabled = 30% opacity.
function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "relative inline-flex h-3 w-8 shrink-0 items-center rounded-full bg-[var(--mg-neutral)] outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 data-[checked]:bg-primary data-[disabled]:cursor-not-allowed data-[disabled]:opacity-30 aria-invalid:bg-background aria-invalid:shadow-[inset_0_0_0_1px_var(--mg-border-error)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-4 rounded-full bg-[var(--mg-switch-handle)] shadow-sm transition-transform data-[checked]:translate-x-4"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
