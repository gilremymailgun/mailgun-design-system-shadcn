import type { Meta, StoryObj } from "@storybook/react-vite"
import { Check } from "lucide-react"

import { Badge, type BadgeStatus } from "./badge"

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: ["filled", "outline"] },
    status: {
      control: "select",
      options: [undefined, "success", "warning", "danger", "info"],
    },
  },
  args: { children: "Badge", variant: "filled" },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const variants = ["filled", "outline"] as const
const statuses: BadgeStatus[] = ["success", "warning", "danger", "info"]

function Matrix() {
  return (
    <div className="flex flex-col gap-4 p-6">
      {variants.map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="w-16 text-caption text-muted-foreground">{variant}</span>
          <Badge variant={variant}>Badge</Badge>
          <Badge variant={variant}>
            <Check /> With icon
          </Badge>
          {statuses.map((status) => (
            <Badge key={status} variant={variant} status={status}>
              {status}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  )
}

export const AllVariants: Story = { render: () => <Matrix /> }

export const AllVariantsDark: Story = {
  render: () => <Matrix />,
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground">
        <Story />
      </div>
    ),
  ],
}
