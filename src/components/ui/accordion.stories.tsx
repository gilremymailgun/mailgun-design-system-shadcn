import type { Meta, StoryObj } from "@storybook/react-vite"
import { Info } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionLinkTrigger,
  AccordionTrigger,
} from "./accordion"
import { Badge } from "./badge"

const meta = {
  title: "Components/Accordion",
  component: Accordion,
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const body =
  "Big text very very long. Another big text very long. This one is just for fun."

function Example() {
  return (
    <div className="flex max-w-xl flex-col gap-10 p-6">
      <Accordion defaultValue={["one"]}>
        <AccordionItem value="one">
          <AccordionTrigger icon={<Info />} badge={<Badge>Badge</Badge>}>
            Expanded (click to collapse)
          </AccordionTrigger>
          <AccordionContent>{body}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="two">
          <AccordionTrigger icon={<Info />} badge={<Badge>Badge</Badge>}>
            Collapsed (hover me)
          </AccordionTrigger>
          <AccordionContent>{body}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="three">
          <AccordionTrigger>No icon, no badge</AccordionTrigger>
          <AccordionContent>{body}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="four" locked>
          <AccordionTrigger icon={<Info />} badge={<Badge>Badge</Badge>}>
            Locked
          </AccordionTrigger>
          <AccordionContent>{body}</AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion>
        <AccordionItem value="link" variant="link">
          <AccordionLinkTrigger>Link</AccordionLinkTrigger>
          <AccordionContent className="p-0 pt-2">{body}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export const Default: Story = { render: () => <Example /> }

export const DefaultDark: Story = {
  render: () => <Example />,
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground">
        <Story />
      </div>
    ),
  ],
}
