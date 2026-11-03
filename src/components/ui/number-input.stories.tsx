import type { Meta, StoryObj } from "@storybook/react-vite"

import { NumberInput } from "./number-input"

const meta = {
  title: "Components/Number Input",
  component: NumberInput,
  parameters: { layout: "centered" },
  args: { defaultValue: 12, min: 0, max: 59, className: "w-[254px]" },
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Small: Story = { args: { size: "sm" } }
export const Invalid: Story = { args: { invalid: true } }
export const Disabled: Story = { args: { disabled: true } }
export const TwoDigits: Story = {
  args: { defaultValue: 0, format: { minimumIntegerDigits: 2 } },
}
export const Time: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <NumberInput
        className="w-[69px]"
        inputClassName="px-1 text-center"
        aria-label="Hours"
        defaultValue={12}
        min={0}
        max={23}
        format={{ minimumIntegerDigits: 2 }}
      />
      <span className="text-sm text-muted-foreground">:</span>
      <NumberInput
        className="w-[76px]"
        inputClassName="px-1 text-center"
        aria-label="Minutes"
        defaultValue={0}
        min={0}
        max={59}
        format={{ minimumIntegerDigits: 2 }}
      />
    </div>
  ),
}
