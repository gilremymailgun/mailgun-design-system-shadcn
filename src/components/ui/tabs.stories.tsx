import type { Meta, StoryObj } from "@storybook/react-vite"
import { Mail } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

const meta = {
  title: "Components/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

function Example() {
  return (
    <div className="max-w-xl p-6">
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">Item 1</TabsTrigger>
          <TabsTrigger value="two">Item 2</TabsTrigger>
          <TabsTrigger value="three">
            Item 3 <span className="text-caption">(203)</span>
          </TabsTrigger>
          <TabsTrigger value="four">
            <Mail /> With icon
          </TabsTrigger>
          <TabsTrigger value="five" disabled>
            Disabled
          </TabsTrigger>
        </TabsList>
        <TabsContent value="one">Content for item 1</TabsContent>
        <TabsContent value="two">Content for item 2</TabsContent>
        <TabsContent value="three">Content for item 3</TabsContent>
        <TabsContent value="four">Content for the icon tab</TabsContent>
        <TabsContent value="five">Content for disabled</TabsContent>
      </Tabs>
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
