import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import {
  Card,
  CardActions,
  CardCheck,
  CardDescription,
  CardFooter,
  CardHeader,
  CardSection,
  CardTitle,
} from "./card"

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

function Sample({
  actions,
  check,
}: {
  actions?: "left" | "right"
  check?: "default" | "success" | "warning" | "alert"
}) {
  return (
    <Card className="max-w-xl">
      <CardSection separator={!!actions}>
        <CardHeader>
          <CardTitle>Title of the card</CardTitle>
          {check && <CardCheck state={check} />}
        </CardHeader>
        <CardDescription>
          Card content goes in the section slot. Sections have 24px padding and a
          16px gap. A Banner can sit between the title and the description once
          the Banner component exists.
        </CardDescription>
      </CardSection>
      {actions && (
        <CardFooter>
          <CardActions align={actions}>
            <Button variant="tertiary">Cancel</Button>
            <Button>Save</Button>
          </CardActions>
        </CardFooter>
      )}
    </Card>
  )
}

export const Default: Story = { render: () => <Sample /> }

export const WithIcon: Story = { render: () => <Sample check="default" /> }

export const WithFooterRightActions: Story = {
  render: () => <Sample check="default" actions="right" />,
}

export const WithFooterLeftActions: Story = {
  render: () => <Sample actions="left" />,
}

export const CheckStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Sample check="default" />
      <Sample check="success" />
      <Sample check="warning" />
      <Sample check="alert" />
    </div>
  ),
}

export const MultipleSections: Story = {
  render: () => (
    <Card className="max-w-xl">
      <CardSection>
        <CardHeader>
          <CardTitle>Section one</CardTitle>
        </CardHeader>
        <CardDescription>Separated from the next section by a 1px border.</CardDescription>
      </CardSection>
      <CardSection separator={false}>
        <CardHeader>
          <CardTitle>Section two</CardTitle>
          <CardCheck state="success" />
        </CardHeader>
        <CardDescription>Last section, no separator.</CardDescription>
      </CardSection>
    </Card>
  ),
}

export const AllLayoutsDark: Story = {
  render: () => (
    <div className="dark flex flex-col gap-6 bg-background p-6">
      <Sample check="success" actions="right" />
    </div>
  ),
}
