"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import type { Matcher } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { TimeInput, type TimeValue } from "./time-input"

/* Figma: Date Picker (242px wide): Calendar (16px padding) + Footer (Cancel secondary, Apply primary,
   right aligned, 16px padding, 8px gap) + optional Time row (see time-input.tsx).
   Trigger: variant "input" = Input box look (forms); variant "button" = Figma secondary Button with a
   leading calendar icon. The value commits on Apply; Cancel and outside click discard the draft.
   With `withTime` the value is a Date that includes the time. AM/PM (12h default) is an addition beyond
   Figma, which has only hours and minutes. */

type DatePickerProps = {
  value?: Date
  onValueChange?: (value: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  /** Days that cannot be picked (react-day-picker matcher). */
  disabledDays?: Matcher | Matcher[]
  size?: "default" | "sm"
  /** Show the time row under the footer and include the time in the value. */
  withTime?: boolean
  /** 12 shows AM/PM (default); 24 shows 0-23 hours. */
  hourCycle?: 12 | 24
  /** "input" (default): Input-style trigger for forms. "button": Figma's secondary Button trigger. */
  variant?: "input" | "button"
  className?: string
}

const formatDate = (d: Date) =>
  d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })

const formatDateTime = (d: Date, hourCycle: 12 | 24) =>
  `${d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" })} ${d.toLocaleTimeString(
    "en-US",
    { hour: hourCycle === 12 ? "numeric" : "2-digit", minute: "2-digit", hour12: hourCycle === 12 }
  )}`

const toTimeValue = (d: Date | undefined, hourCycle: 12 | 24): TimeValue => {
  if (!d) return { hours: hourCycle === 12 ? 12 : 0, minutes: 0, period: "AM" }
  const h = d.getHours()
  return hourCycle === 12
    ? { hours: h % 12 || 12, minutes: d.getMinutes(), period: h >= 12 ? "PM" : "AM" }
    : { hours: h, minutes: d.getMinutes(), period: h >= 12 ? "PM" : "AM" }
}

const withTimeApplied = (date: Date, t: TimeValue, hourCycle: 12 | 24) => {
  const next = new Date(date)
  const h = hourCycle === 12 ? (t.hours % 12) + (t.period === "PM" ? 12 : 0) : t.hours
  next.setHours(h, t.minutes, 0, 0)
  return next
}

function DatePicker({
  value,
  onValueChange,
  placeholder = "Select a date",
  disabled,
  invalid,
  disabledDays,
  size = "default",
  withTime = false,
  hourCycle = 12,
  variant = "input",
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [draft, setDraft] = React.useState<Date | undefined>(value)
  const [draftTime, setDraftTime] = React.useState<TimeValue>(() => toTimeValue(value, hourCycle))

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setDraft(value)
      setDraftTime(toTimeValue(value, hourCycle))
    }
    setOpen(next)
  }

  const label = value
    ? withTime
      ? formatDateTime(value, hourCycle)
      : formatDate(value)
    : placeholder

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      {variant === "button" ? (
        <PopoverTrigger
          disabled={disabled}
          render={
            <Button
              variant="secondary"
              size={size === "sm" ? "sm" : "default"}
              className={cn("w-full justify-start", className)}
            />
          }
        >
          <CalendarIcon aria-hidden />
          {label}
        </PopoverTrigger>
      ) : (
        <PopoverTrigger
          disabled={disabled}
          aria-invalid={invalid || undefined}
          data-size={size}
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-sm border border-input bg-[var(--mg-surface-input)] text-sm leading-[22px] tracking-[-0.01em] whitespace-nowrap text-foreground transition-colors outline-none select-none hover:border-[var(--mg-border-strong)] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:border-ring disabled:pointer-events-none disabled:opacity-[var(--mg-disabled-opacity)] aria-invalid:border-[var(--mg-border-error)] aria-invalid:ring-3 aria-invalid:ring-[var(--mg-border-error)]/30 data-[size=default]:h-[38px] data-[size=default]:px-4 data-[size=sm]:h-[30px] data-[size=sm]:px-2 [&_svg]:size-4 [&_svg]:shrink-0",
            className
          )}
        >
          <span className={cn(!value && "text-muted-foreground")}>{label}</span>
          <CalendarIcon aria-hidden />
        </PopoverTrigger>
      )}
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
              onValueChange?.(
                draft && withTime ? withTimeApplied(draft, draftTime, hourCycle) : draft
              )
              setOpen(false)
            }}
          >
            Apply
          </Button>
        </div>
        {withTime && (
          <TimeInput value={draftTime} onChange={setDraftTime} hourCycle={hourCycle} />
        )}
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
