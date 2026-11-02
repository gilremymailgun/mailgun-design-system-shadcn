import type { Meta, StoryObj } from "@storybook/react-vite"
import { Plus } from "lucide-react"
import { Button } from "./button"

const variants = [
  "default",
  "brand",
  "secondary",
  "secondary-dark",
  "secondary-neutral",
  "tertiary",
  "destructive",
] as const

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Button" },
  argTypes: {
    variant: { control: "select", options: [...variants, "outline", "ghost", "link"] },
    size: { control: "select", options: ["default", "sm", "icon", "icon-sm"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

function Matrix() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 24 }}>
      {variants.map((v) => (
        <div key={v} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ width: 130, fontSize: 12, opacity: 0.7 }}>{v}</span>
          <Button variant={v} size="sm">Small</Button>
          <Button variant={v}>Default</Button>
          <Button variant={v}><Plus />Leading</Button>
          <Button variant={v}>Trailing<Plus /></Button>
          <Button variant={v} size="icon-sm" aria-label="Add"><Plus /></Button>
          <Button variant={v} size="icon" aria-label="Add"><Plus /></Button>
          <Button variant={v} disabled>Disabled</Button>
          <Button variant={v} loading>Loading</Button>
        </div>
      ))}
    </div>
  )
}

export const Default: Story = {}

export const AllVariants: Story = { render: () => <Matrix /> }

export const AllVariantsDark: Story = {
  render: () => <Matrix />,
  decorators: [
    (Child) => (
      <div className="dark bg-background text-foreground">
        <Child />
      </div>
    ),
  ],
}
