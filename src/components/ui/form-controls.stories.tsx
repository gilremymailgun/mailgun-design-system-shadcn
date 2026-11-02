import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import { Checkbox } from "./checkbox"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Switch } from "./switch"

const meta = {
  title: "Components/Form controls (checkbox, radio, switch)",
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Row({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <label className="inline-flex items-start gap-2 text-body-2">
      <span className="mt-[2px]">{children}</span>
      <span className="flex flex-col">
        <span>{label}</span>
        {sub && <span className="text-caption text-muted-foreground">{sub}</span>}
      </span>
    </label>
  )
}

function Matrix() {
  return (
    <div className="flex flex-col gap-8 p-6">
      <section className="flex flex-col gap-3">
        <h3 className="text-caption text-muted-foreground">Checkbox</h3>
        <div className="flex flex-wrap gap-6">
          <Row label="Unselected"><Checkbox /></Row>
          <Row label="Selected" sub="Sub label"><Checkbox defaultChecked /></Row>
          <Row label="Partial"><Checkbox indeterminate /></Row>
          <Row label="Invalid"><Checkbox aria-invalid /></Row>
          <Row label="Disabled"><Checkbox disabled /></Row>
          <Row label="Disabled selected"><Checkbox disabled defaultChecked /></Row>
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <h3 className="text-caption text-muted-foreground">Radio</h3>
        <div className="flex flex-wrap gap-12">
          <RadioGroup defaultValue="a">
            <Row label="Selected"><RadioGroupItem value="a" /></Row>
            <Row label="Unselected" sub="Sub label"><RadioGroupItem value="b" /></Row>
          </RadioGroup>
          <RadioGroup defaultValue="x">
            <Row label="Invalid"><RadioGroupItem value="y" aria-invalid /></Row>
            <Row label="Disabled"><RadioGroupItem value="z" disabled /></Row>
            <Row label="Disabled selected"><RadioGroupItem value="x" disabled /></Row>
          </RadioGroup>
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <h3 className="text-caption text-muted-foreground">Switch</h3>
        <div className="flex flex-wrap gap-6">
          <Row label="Off"><Switch /></Row>
          <Row label="On"><Switch defaultChecked /></Row>
          <Row label="Invalid"><Switch aria-invalid /></Row>
          <Row label="Disabled off"><Switch disabled /></Row>
          <Row label="Disabled on"><Switch disabled defaultChecked /></Row>
        </div>
      </section>
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
