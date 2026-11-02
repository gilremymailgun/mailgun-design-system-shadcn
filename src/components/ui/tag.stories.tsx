import type { Meta, StoryObj } from "@storybook/react-vite"
import { User } from "lucide-react"

import { ReleaseTag, Tag, type Release, type TagStatus } from "./tag"

const meta = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  args: { children: "Tag" },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const statuses: TagStatus[] = ["success", "warning", "danger", "info"]
const releases: Release[] = ["beta", "alpha", "dev", "new", "upgrade"]

function Matrix() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-wrap items-center gap-4">
        <span className="w-24 text-caption text-muted-foreground">Label (no remove)</span>
        <Tag>Label</Tag>
        <Tag icon={<User />}>With icon</Tag>
        {statuses.map((s) => (
          <Tag key={s} status={s}>{s}</Tag>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <span className="w-24 text-caption text-muted-foreground">Tag (removable)</span>
        <Tag onRemove={() => {}}>Tag</Tag>
        <Tag icon={<User />} onRemove={() => {}}>With icon</Tag>
        {statuses.map((s) => (
          <Tag key={s} status={s} onRemove={() => {}}>{s}</Tag>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <span className="w-24 text-caption text-muted-foreground">ReleaseTag</span>
        {releases.map((r) => (
          <ReleaseTag key={r} release={r} />
        ))}
      </div>
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
