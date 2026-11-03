import type { Meta, StoryObj } from "@storybook/react-vite"
import { Paperclip } from "lucide-react"
import * as React from "react"

import {
  Breadcrumb,
  BreadcrumbBack,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb"

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

function Trail({ icons }: { icons?: boolean }) {
  const icon = icons ? <Paperclip /> : null
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {["Item 1", "Item 2", "Item 3", "Item 4"].map((label) => (
          <React.Fragment key={label}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                {icon}
                {label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>
            {icon}
            Item 5
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function Examples() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <Trail icons />
      <Trail />
      <BreadcrumbBack href="#" />
    </div>
  )
}

export const Default: Story = { render: () => <Examples /> }

export const DefaultDark: Story = {
  render: () => <Examples />,
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground">
        <Story />
      </div>
    ),
  ],
}
