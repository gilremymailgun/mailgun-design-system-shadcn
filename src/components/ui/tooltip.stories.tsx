import type { Meta, StoryObj } from "@storybook/react-vite"

import { buttonVariants } from "./button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

const meta = {
  title: "Components/Tooltip",
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <div className="p-24">
        <Tooltip>
          <TooltipTrigger className={buttonVariants({ variant: "secondary", size: "sm" })}>
            Hover or focus me
          </TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}

const placements = [
  ["Top left", "top", "start"],
  ["Top middle", "top", "center"],
  ["Top right", "top", "end"],
  ["Left", "left", "center"],
  ["Right", "right", "center"],
  ["Bottom left", "bottom", "start"],
  ["Bottom center", "bottom", "center"],
  ["Bottom right", "bottom", "end"],
] as const

function Matrix() {
  return (
    <TooltipProvider>
      <div className="grid grid-cols-4 gap-x-48 gap-y-32 p-32">
        {placements.map(([label, side, align]) => (
          <Tooltip key={label} open>
            <TooltipTrigger className={buttonVariants({ variant: "secondary", size: "sm" })}>
              {label}
            </TooltipTrigger>
            <TooltipContent side={side} align={align}>
              Tooltip content
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}

export const AllPlacements: Story = { render: () => <Matrix /> }

export const AllPlacementsDark: Story = {
  render: () => <Matrix />,
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground">
        <Story />
      </div>
    ),
  ],
}
