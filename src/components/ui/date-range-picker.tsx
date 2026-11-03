"use client"

import * as React from "react"
import { ArrowRight, CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { NumberInput } from "./number-input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

/* Figma: Date Range (639px): Presets column (147px, 16px padding, 8px gap, right border) +
   DateSelection (492px): Calendar x2 (16px padding, 40px gap), Selected period (16/24 padding, 12px gap),
   Footer (Cancel + Apply, top border), optional Time row (two number inputs, top border).
   Value commits on Apply. Presets: Last week, Last 30 days, Last 90 days, Custom. */

const fmt = (d?: Date) =>
  d
    ? d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" })
    : "--/--/--"

const daysAgo = (n: number): DateRange => {
  const to = new Date()
  const from = new Date()
  from.setDate(to.getDate() - n)
  return { from, to }
}

const PRESETS = [
  { label: "Last week", range: () => daysAgo(7) },
  { label: "Last 30 days", range: () => daysAgo(30) },
  { label: "Last 90 days", range: () => daysAgo(90) },
  { label: "Custom", range: null },
] as const

type Time = { hours: number; minutes: number }

const DEFAULT_TIME: Time = { hours: 12, minutes: 0 }

type DateRangePickerProps = {
  value?: DateRange
  onValueChange?: (value: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  size?: "default" | "sm"
  /** Show the preset column. */
  presets?: boolean
  /** Show the time row (hours : minutes). */
  withTime?: boolean
  time?: Time
  onTimeChange?: (time: Time) => void
  className?: string
}

function DateRangePicker({
  value,
  onValueChange,
  placeholder = "Select a period",
  disabled,
  invalid,
  size = "default",
  presets = true,
  withTime = false,
  time,
  onTimeChange,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [draft, setDraft] = React.useState<DateRange | undefined>(value)
  const [preset, setPreset] = React.useState<string>("Custom")
  const [draftTime, setDraftTime] = React.useState<Time>(time ?? DEFAULT_TIME)

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setDraft(value)
      setDraftTime(time ?? DEFAULT_TIME)
    }
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
        <span className={cn(!value?.from && "text-muted-foreground")}>
          {value?.from ? `${fmt(value.from)} – ${fmt(value.to)}` : placeholder}
        </span>
        <CalendarIcon aria-hidden />
      </PopoverTrigger>
      <PopoverContent className="flex">
        {presets && (
          <div className="flex w-[147px] shrink-0 flex-col gap-2 border-r border-border p-4">
            {PRESETS.map((p) => (
              <Button
                key={p.label}
                variant="secondary"
                aria-pressed={preset === p.label}
                className={cn(
                  "w-full",
                  preset === p.label && "bg-[var(--mg-surface-secondary-active)]"
                )}
                onClick={() => {
                  setPreset(p.label)
                  if (p.range) setDraft(p.range())
                }}
              >
                {p.label}
              </Button>
            ))}
          </div>
        )}
        <div className="flex flex-col">
          <Calendar
            mode="range"
            numberOfMonths={2}
            selected={draft}
            onSelect={(r) => {
              setDraft(r)
              setPreset("Custom")
            }}
            defaultMonth={draft?.from ?? value?.from}
          />
          <div className="flex items-center gap-3 px-4 py-6">
            <span className="text-sm leading-6 font-medium tracking-[-0.01em]">
              Selected period
            </span>
            <span className="flex items-center gap-3 text-sm leading-[22px] tracking-[-0.01em]">
              <CalendarIcon className="size-4" aria-hidden />
              {fmt(draft?.from)}
            </span>
            <span className="flex items-center gap-4 text-sm leading-[22px] tracking-[-0.01em]">
              <ArrowRight className="size-4" aria-hidden />
              {fmt(draft?.to)}
            </span>
          </div>
          <div className="flex items-center justify-end gap-2 border-t border-border p-4">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                onValueChange?.(draft)
                if (withTime) onTimeChange?.(draftTime)
                setOpen(false)
              }}
            >
              Apply
            </Button>
          </div>
          {withTime && (
            <div className="flex items-center gap-2 border-t border-border p-2">
              <NumberInput
                className="w-[69px]"
                inputClassName="px-1 text-center"
                aria-label="Hours"
                min={0}
                max={23}
                format={{ minimumIntegerDigits: 2 }}
                value={draftTime.hours}
                onValueChange={(n) => setDraftTime((t) => ({ ...t, hours: n ?? 0 }))}
              />
              <span className="text-sm leading-[22px] text-muted-foreground">:</span>
              <NumberInput
                className="w-[76px]"
                inputClassName="px-1 text-center"
                aria-label="Minutes"
                min={0}
                max={59}
                format={{ minimumIntegerDigits: 2 }}
                value={draftTime.minutes}
                onValueChange={(n) => setDraftTime((t) => ({ ...t, minutes: n ?? 0 }))}
              />
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { DateRangePicker }
