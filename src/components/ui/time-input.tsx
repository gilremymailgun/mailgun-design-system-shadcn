"use client"

import * as React from "react"
import { cn } from "cn"

import { NumberInput } from "./number-input"

/* Time row under the Date Picker footer: hours : minutes (Figma Number inputs, 69px and 76px wide)
   plus an AM/PM segmented toggle in 12-hour mode (product pattern; Figma's Time row has only the
   two number fields). 12h hours run 1-12, 24h hours run 0-23. */

type TimeValue = { hours: number; minutes: number; period: "AM" | "PM" }

type TimeInputProps = {
  value: TimeValue
  onChange: (value: TimeValue) => void
  hourCycle?: 12 | 24
  className?: string
}

function TimeInput({ value, onChange, hourCycle = 12, className }: TimeInputProps) {
  const is12 = hourCycle === 12
  return (
    <div
      data-slot="time-input"
      className={cn("flex items-center gap-2 border-t border-border p-2", className)}
    >
      <NumberInput
        className="w-[69px]"
        inputClassName="px-1 text-center"
        aria-label="Hours"
        min={is12 ? 1 : 0}
        max={is12 ? 12 : 23}
        format={{ minimumIntegerDigits: 2 }}
        value={value.hours}
        onValueChange={(n) => onChange({ ...value, hours: n ?? (is12 ? 12 : 0) })}
      />
      <span className="text-sm leading-[22px] text-muted-foreground">:</span>
      <NumberInput
        className="w-[76px]"
        inputClassName="px-1 text-center"
        aria-label="Minutes"
        min={0}
        max={59}
        format={{ minimumIntegerDigits: 2 }}
        value={value.minutes}
        onValueChange={(n) => onChange({ ...value, minutes: n ?? 0 })}
      />
      {is12 && (
        <div role="group" aria-label="AM or PM" className="ml-1 flex">
          {(["AM", "PM"] as const).map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={value.period === p}
              onClick={() => onChange({ ...value, period: p })}
              className="relative -ml-px inline-flex h-[38px] items-center border border-ring bg-card px-4 text-sm leading-[22px] tracking-[-0.01em] text-foreground outline-none transition-colors first:ml-0 first:rounded-l-sm last:rounded-r-sm hover:bg-accent focus-visible:z-10 focus-visible:ring-3 focus-visible:ring-ring/50 aria-pressed:z-10 aria-pressed:bg-[var(--mg-surface-secondary-active)] aria-pressed:text-primary aria-pressed:hover:bg-[var(--mg-surface-secondary-active)]"
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { TimeInput, type TimeValue }
