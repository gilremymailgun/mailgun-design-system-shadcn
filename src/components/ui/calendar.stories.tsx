import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { DateRange } from "react-day-picker"

import { Calendar } from "./calendar"

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

function Single() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return <Calendar mode="single" selected={date} onSelect={setDate} className="border border-border" />
}

function Range({ months = 1 }: { months?: number }) {
  const today = new Date()
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(today.getFullYear(), today.getMonth(), 8),
    to: new Date(today.getFullYear(), today.getMonth(), 14),
  })
  return (
    <Calendar
      mode="range"
      numberOfMonths={months}
      selected={range}
      onSelect={setRange}
      className="border border-border"
    />
  )
}

export const SingleDate: Story = { render: () => <Single /> }
export const DateRangeSelection: Story = { render: () => <Range /> }
export const TwoMonths: Story = { render: () => <Range months={2} /> }
export const DisabledDays: Story = {
  render: () => (
    <Calendar
      mode="single"
      disabled={{ before: new Date() }}
      className="border border-border"
    />
  ),
}
export const Dark: Story = {
  render: () => (
    <div className="dark bg-background p-6">
      <Range />
    </div>
  ),
}
