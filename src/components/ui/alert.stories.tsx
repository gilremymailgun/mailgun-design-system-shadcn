import type { Meta, StoryObj } from "@storybook/react-vite"

import { Alert } from "./alert"

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: { layout: "padded" },
  args: {
    children:
      "A temporary sending limit of 200 emails has been applied on your account. Please contact support.",
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Critical: Story = { args: { type: "critical" } }
export const Warning: Story = { args: { type: "warning" } }

export const AllTypes: Story = {
  render: (args) => (
    <div className="flex max-w-3xl flex-col gap-4">
      <Alert {...args} type="critical" />
      <Alert {...args} type="warning" />
    </div>
  ),
}

export const AllTypesDark: Story = {
  render: (args) => (
    <div className="dark flex max-w-3xl flex-col gap-4 bg-background p-6">
      <Alert {...args} type="critical" />
      <Alert {...args} type="warning" />
    </div>
  ),
}
