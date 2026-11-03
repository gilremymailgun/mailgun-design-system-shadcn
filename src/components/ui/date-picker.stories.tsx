import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { DatePicker } from "./date-picker"

const meta = {
  title: "Components/Date Picker",
  component: DatePicker,
  parameters: { layout: "centered" },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

function Demo(props: Partial<React.ComponentProps<typeof DatePicker>>) {
  const [value, setValue] = React.useState<Date | undefined>(props.value)
  return (
    <div className="min-h-[460px] w-[280px]">
      <DatePicker {...props} value={value} onValueChange={setValue} />
    </div>
  )
}

export const Default: Story = { render: () => <Demo /> }
export const WithValue: Story = { render: () => <Demo value={new Date()} /> }
export const Small: Story = { render: () => <Demo size="sm" /> }
export const Invalid: Story = { render: () => <Demo invalid /> }
export const Disabled: Story = { render: () => <Demo disabled value={new Date()} /> }
export const PastDisabled: Story = {
  render: () => <Demo disabledDays={{ before: new Date() }} />,
}
