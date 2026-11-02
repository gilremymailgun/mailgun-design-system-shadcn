import type { Meta, StoryObj } from "@storybook/react-vite"
import { User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import photo from "@/assets/avatars/avatar-1.jpg"

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: ["filled", "outlined"] },
    size: { control: "inline-radio", options: ["sm", "lg"] },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
}

function Matrix() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {(["lg", "sm"] as const).map((size) => (
        <div key={size} className="flex items-center gap-6">
          <span className="w-12 text-caption text-muted-foreground">{size}</span>
          {(["filled", "outlined"] as const).map((variant) => (
            <div key={variant} className="flex items-center gap-3">
              <Avatar variant={variant} size={size}>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <Avatar variant={variant} size={size}>
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              {variant === "filled" && (
                <Avatar variant={variant} size={size}>
                  <AvatarImage src={photo} alt="Photo" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              )}
            </div>
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
