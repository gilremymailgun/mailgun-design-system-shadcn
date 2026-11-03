"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import type { Matcher } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

/* Figma: Date Picker (242px wide): Calendar (16px padding) + Footer (Cancel secondary, Apply primary,
   right aligned, 16px padding, 8px gap). Trigger = Input box look (see input.tsx / select.tsx).
   The value commits on Apply; Cancel and outside click discard the draft. */

type DatePickerProps = {
  value?: Date
  onValueChange?: (value: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  /** Days that cannot be picked (react-day-picker matcher). */
  disabledDays?: Matcher | Matcher[]
  size?: "default" | "sm"
  className?: string
}

const formatDate = (d: Date) =>
  d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })

function DatePicker({
  value,
  onValueChange,
  placeholder = "Select a date",
  disabled,
  invalid,
  disabledDays,
  size = "default",
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [draft, setDraft] = React.useState<Date | undefined>(value)

  const handleOpenChange = (next: boolean) => {
    if (next) setDraft(value)
    setOpen(next)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        disabled={disabled}
        aria-invalid={invalid || undefined}
        data-size={size}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-sm border border-input bg-[var(--mg-surface-input)] text-sm leading-[22px] tracking-[-0.01em] whitespace-nowrap text-foreground transition-colors outline-none select-none hover:border-[var(--mg-border-strong)] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:border-ring disabled:pointer-events-none disabled:opacity-[var(--mg-disabled-opacity)] aria-invalid:border-[var(--mg-border-error)] aria-invalid:ring-3 aria-invalid:ring-[var(--mg-border-error)]/30 data-[size=default]:h-[38px] data-[size=default]:px-4 data-[size=sm]:h-[30px] data-[size=sm]:px-2 [&_svg]:size-4 [&_svg]:shrink-0",
          className
        )}
      >
        <span className={cn(!value && "text-muted-foreground")}>
          {value ? formatDate(value) : placeholder}
        </span>
        <CalendarIcon aria-hidden />
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={draft}
          onSelect={setDraft}
          defaultMonth={draft ?? value}
          disabled={disabledDays}
        />
        <div className="flex items-center justify-end gap-2 p-4">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onValueChange?.(draft)
              setOpen(false)
            }}
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
