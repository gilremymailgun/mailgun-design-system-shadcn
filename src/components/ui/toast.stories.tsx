import type { Meta, StoryObj } from "@storybook/react-vite"

import { Toast } from "./toast"

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: { layout: "padded" },
  args: {
    children: "Toast message goes here",
    onClose: () => {},
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { type: "default" } }
export const Error: Story = { args: { type: "error" } }
export const Success: Story = { args: { type: "success" } }
export const Warning: Story = { args: { type: "warning" } }
export const WithAction: Story = {
  args: { type: "default", action: "Undo", onAction: () => {} },
}
export const WithoutIcon: Story = { args: { icon: false } }

const types = ["default", "error", "success", "warning"] as const

export const AllTypes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {types.map((t) => (
        <Toast key={t} {...args} type={t} />
      ))}
    </div>
  ),
}

export const AllTypesWithAction: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {types.map((t) => (
        <Toast key={t} {...args} type={t} className="w-[380px]" action="Action" />
      ))}
    </div>
  ),
}

export const AllTypesDark: Story = {
  render: (args) => (
    <div className="dark flex flex-col gap-4 bg-background p-6">
      {types.map((t) => (
        <Toast key={t} {...args} type={t} />
      ))}
    </div>
  ),
}
