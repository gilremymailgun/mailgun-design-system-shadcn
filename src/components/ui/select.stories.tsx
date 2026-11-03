import type { Meta, StoryObj } from "@storybook/react-vite"

import { Settings, Trash2 } from "lucide-react"

import { Badge } from "./badge"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select"

const items = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

function Demo({
  size = "default",
  disabled,
  invalid,
  defaultValue,
  defaultOpen,
}: {
  size?: "default" | "sm"
  disabled?: boolean
  invalid?: boolean
  defaultValue?: string
  defaultOpen?: boolean
}) {
  return (
    <div className="min-h-[320px] w-[280px]">
      <Select items={items} defaultValue={defaultValue} disabled={disabled} defaultOpen={defaultOpen}>
        <SelectTrigger size={size} aria-invalid={invalid || undefined}>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {items.slice(0, 3).map((i) => (
              <SelectItem key={i.value} value={i.value}>
                {i.label}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            {items.slice(3).map((i) => (
              <SelectItem key={i.value} value={i.value}>
                {i.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export const Default: Story = { render: () => <Demo /> }
export const Open: Story = { render: () => <Demo defaultOpen defaultValue="banana" /> }
export const Small: Story = { render: () => <Demo size="sm" /> }
export const WithValue: Story = { render: () => <Demo defaultValue="apple" /> }
export const Invalid: Story = { render: () => <Demo invalid /> }
export const Disabled: Story = { render: () => <Demo disabled defaultValue="apple" /> }

export const MenuVariations: Story = {
  render: () => (
    <div className="min-h-[420px] w-[320px]">
      <Select defaultOpen defaultValue="icon">
        <SelectTrigger>
          <SelectValue placeholder="Choose an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Title</SelectLabel>
            <SelectItem value="icon"><Settings />Leading icon</SelectItem>
            <SelectItem value="sub" description="Muted sub-label text">With sub-label</SelectItem>
            <SelectItem value="small" description="Small sub-label (12px)" smallDescription>With small sub-label</SelectItem>
            <SelectItem value="badge" badge={<Badge>New</Badge>}>With badge</SelectItem>
            <SelectItem value="disabled" disabled>Disabled</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectItem value="destructive" variant="destructive"><Trash2 />Destructive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}
