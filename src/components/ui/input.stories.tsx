import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChevronDown, Search } from "lucide-react"

import { Field, FieldDescription, FieldHelper, FieldLabel } from "./field"
import { Input } from "./input"

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["default", "sm"] },
    disabled: { control: "boolean" },
  },
  args: { placeholder: "Placeholder" },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

function Matrix() {
  return (
    <div className="grid max-w-3xl gap-8 p-6 md:grid-cols-2">
      <Field>
        <FieldLabel optional="(Optional)" hint="More information">Label</FieldLabel>
        <FieldDescription>Additional custom text</FieldDescription>
        <Input placeholder="Placeholder" />
        <FieldHelper counter="0/10">Help text</FieldHelper>
      </Field>
      <Field>
        <FieldLabel>With value (click to see focus)</FieldLabel>
        <Input defaultValue="Input value" />
      </Field>
      <Field invalid>
        <FieldLabel>Error</FieldLabel>
        <Input defaultValue="Input value" />
        <FieldHelper counter="0/10">This value is not valid</FieldHelper>
      </Field>
      <Field disabled>
        <FieldLabel optional="(Optional)">Disabled</FieldLabel>
        <FieldDescription>Additional custom text</FieldDescription>
        <Input placeholder="Placeholder" />
        <FieldHelper counter="0/10">Help text</FieldHelper>
      </Field>
      <Field>
        <FieldLabel>Small</FieldLabel>
        <Input size="sm" placeholder="Placeholder" />
      </Field>
      <Field>
        <FieldLabel>Small with leading icon</FieldLabel>
        <Input size="sm" placeholder="Search" startIcon={<Search />} />
      </Field>
      <Field>
        <FieldLabel>Trailing icon</FieldLabel>
        <Input placeholder="Select" endIcon={<ChevronDown />} />
      </Field>
      <Field>
        <FieldLabel>Both icons</FieldLabel>
        <Input placeholder="Search" startIcon={<Search />} endIcon={<ChevronDown />} />
      </Field>
    </div>
  )
}

export const AllStates: Story = { render: () => <Matrix /> }

export const AllStatesDark: Story = {
  render: () => <Matrix />,
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground">
        <Story />
      </div>
    ),
  ],
}
