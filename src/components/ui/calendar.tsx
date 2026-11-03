"use client"

import * as React from "react"
import { cn } from "cn"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

/* Figma: Date picker/Sub-elements/Date (30x30, 12px Medium, radius 4; position left/middle/right/full;
   states enabled, hovered/focused = surface/secondary/active, pressed = primary/hover + white text,
   disabled = text/disabled; "dotted" = 26x26 dashed inner outline). Calendar: 16px padding, 7x30px grid,
   week line 24px, 16px gaps, 40px between months. "Selected" = Figma "pressed". Range middle uses the
   hover fill (Figma defines position by corner radius only). */

const navButton =
  "inline-flex size-7 items-center justify-center rounded-sm text-foreground outline-none select-none transition-colors hover:bg-[var(--mg-surface-secondary-active)] focus-visible:ring-3 focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-[var(--mg-disabled-opacity)]"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar rounded-sm bg-card p-4 [--cell-size:30px] in-data-[slot=popover-content]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-10 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(navButton, defaultClassNames.button_previous),
        button_next: cn(navButton, defaultClassNames.button_next),
        month_caption: cn(
          "flex h-7 w-full items-center justify-center px-7",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-7 w-full items-center justify-center gap-2 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn("relative rounded-sm", defaultClassNames.dropdown_root),
        dropdown: cn("absolute inset-0 bg-popover opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "text-sm leading-[22px] font-medium tracking-[-0.01em] select-none",
          captionLayout === "label"
            ? ""
            : "flex items-center gap-1 rounded-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        weekdays: cn("mb-4 flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex h-6 w-(--cell-size) items-center justify-center text-xs leading-4 font-medium tracking-[-0.01em] text-muted-foreground select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full", defaultClassNames.week),
        week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
        week_number: cn("text-xs text-muted-foreground select-none", defaultClassNames.week_number),
        day: cn("relative size-(--cell-size) p-0 text-center select-none", defaultClassNames.day),
        range_start: cn(defaultClassNames.range_start),
        range_middle: cn(defaultClassNames.range_middle),
        range_end: cn(defaultClassNames.range_end),
        today: cn(defaultClassNames.today),
        outside: cn(defaultClassNames.outside),
        disabled: cn(defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => (
          <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
        ),
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") return <ChevronLeftIcon className={cn("size-4", className)} {...props} />
          if (orientation === "right") return <ChevronRightIcon className={cn("size-4", className)} {...props} />
          return <ChevronDownIcon className={cn("size-4", className)} {...props} />
        },
        DayButton: ({ ...props }) => <CalendarDayButton locale={locale} {...props} />,
        WeekNumber: ({ children, ...props }) => (
          <td {...props}>
            <div className="flex size-(--cell-size) items-center justify-center text-center">
              {children}
            </div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const single =
    modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={single || undefined}
      data-range-start={modifiers.range_start || undefined}
      data-range-end={modifiers.range_end || undefined}
      data-range-middle={modifiers.range_middle || undefined}
      data-today={modifiers.today || undefined}
      data-outside={modifiers.outside || undefined}
      className={cn(
        "relative flex size-(--cell-size) items-center justify-center rounded-sm text-xs leading-4 font-medium tracking-[-0.01em] text-foreground outline-none transition-colors hover:bg-[var(--mg-surface-secondary-active)] focus-visible:z-10 focus-visible:bg-[var(--mg-surface-secondary-active)] focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:text-[var(--mg-text-disabled)] data-[outside=true]:text-[var(--mg-text-disabled)]",
        "data-[today=true]:after:pointer-events-none data-[today=true]:after:absolute data-[today=true]:after:inset-[2px] data-[today=true]:after:rounded-[3px] data-[today=true]:after:border data-[today=true]:after:border-dashed data-[today=true]:after:border-[var(--mg-surface-secondary-active)] data-[today=true]:after:content-['']",
        "data-[selected-single=true]:bg-[var(--mg-primary-hover)] data-[selected-single=true]:text-card data-[selected-single=true]:hover:bg-[var(--mg-primary-hover)]",
        "data-[range-start=true]:rounded-r-none data-[range-start=true]:bg-[var(--mg-primary-hover)] data-[range-start=true]:text-card data-[range-start=true]:hover:bg-[var(--mg-primary-hover)]",
        "data-[range-end=true]:rounded-l-none data-[range-end=true]:bg-[var(--mg-primary-hover)] data-[range-end=true]:text-card data-[range-end=true]:hover:bg-[var(--mg-primary-hover)]",
        "data-[range-start=true]:data-[range-end=true]:rounded-sm",
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-[var(--mg-surface-secondary-active)] data-[range-middle=true]:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
