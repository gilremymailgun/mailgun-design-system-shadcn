import type { Meta, StoryObj } from "@storybook/react-vite"

import { Banner } from "./banner"
import { Button } from "./button"

const meta = {
  title: "Components/Banner",
  component: Banner,
  parameters: { layout: "padded" },
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    onClose: () => {},
  },
} satisfies Meta<typeof Banner>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = { args: { type: "info" } }
export const Warning: Story = { args: { type: "warning" } }
export const Success: Story = { args: { type: "success" } }
export const Error: Story = { args: { type: "error" } }
export const Tip: Story = { args: { type: "tip" } }

export const WithTitleAndActions: Story = {
  args: {
    type: "info",
    title: "Title",
    actions: (
      <>
        <Button size="sm" variant="secondary">Secondary</Button>
        <Button size="sm">Primary</Button>
      </>
    ),
  },
}

export const AllTypes: Story = {
  render: (args) => (
    <div className="flex max-w-2xl flex-col gap-4">
      {(["info", "warning", "success", "error", "tip"] as const).map((t) => (
        <Banner key={t} {...args} type={t} title="Title" />
      ))}
    </div>
  ),
}

export const AllTypesDark: Story = {
  render: (args) => (
    <div className="dark flex max-w-2xl flex-col gap-4 bg-background p-6">
      {(["info", "warning", "success", "error", "tip"] as const).map((t) => (
        <Banner key={t} {...args} type={t} title="Title" />
      ))}
    </div>
  ),
}
