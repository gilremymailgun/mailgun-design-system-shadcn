import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

import { cn } from "@/lib/utils"

// Figma: Navigation > Tabs. List 40px high with a 1px bottom line; 24px between list and content.
function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  )
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "flex h-10 items-stretch bg-card shadow-[inset_0_-1px_0_var(--border)]",
        className
      )}
      {...props}
    />
  )
}

// Tab: 12px side padding, 4px gap, Body2 Medium. Hover = 2px bottom border + canvas-hover fill.
// Selected (Figma "focused") = 2px --ring border + --primary text. Disabled = --mg-disabled-opacity.
// For a count, put <span className="text-caption">(203)</span> inside; for an icon, add an svg.
function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex h-10 items-center justify-center gap-1 border-b border-border bg-transparent px-3 py-2 text-body-2 leading-6 font-medium whitespace-nowrap text-foreground outline-none transition-colors hover:border-b-2 hover:bg-[var(--mg-surface-canvas-hover)] focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50 aria-selected:border-b-2 aria-selected:border-ring aria-selected:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-[var(--mg-disabled-opacity)] [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
