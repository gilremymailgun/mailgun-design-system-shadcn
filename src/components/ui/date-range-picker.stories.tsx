import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { DateRange } from "react-day-picker"

import { DateRangePicker } from "./date-range-picker"

const meta = {
  title: "Components/Date Range Picker",
  component: DateRangePicker,
  parameters: { layout: "centered" },
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

function Demo(props: Partial<React.ComponentProps<typeof DateRangePicker>>) {
  const [value, setValue] = React.useState<DateRange | undefined>(props.value)
  const [time, setTime] = React.useState({ hours: 12, minutes: 0 })
  return (
    <div className="min-h-[560px] w-[320px]">
      <DateRangePicker
        {...props}
        value={value}
        onValueChange={setValue}
        time={time}
        onTimeChange={setTime}
      />
    </div>
  )
}

export const Default: Story = { render: () => <Demo /> }
export const WithoutPresets: Story = { render: () => <Demo presets={false} /> }
export const WithTime: Story = { render: () => <Demo withTime /> }
export const Small: Story = { render: () => <Demo size="sm" /> }
export const Invalid: Story = { render: () => <Demo invalid /> }
export const Disabled: Story = { render: () => <Demo disabled /> }
