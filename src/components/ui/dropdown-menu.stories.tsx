import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Copy, Settings, Trash2 } from "lucide-react"

import { Badge } from "./badge"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemContent,
  DropdownMenuItemDescription,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu"

const meta = {
  title: "Components/Menu",
  component: DropdownMenu,
  parameters: { layout: "centered" },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

function Demo({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [checked, setChecked] = React.useState(true)
  return (
    <div className="min-h-[420px] min-w-[300px]">
      <DropdownMenu defaultOpen={defaultOpen}>
        <DropdownMenuTrigger render={<Button variant="secondary-dark" />}>
          Open menu
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Title</DropdownMenuLabel>
            <DropdownMenuItem>
              <Settings />
              Item with leading icon
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuItemContent>
                Item with sub-label
                <DropdownMenuItemDescription>Muted sub-label text</DropdownMenuItemDescription>
              </DropdownMenuItemContent>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuItemContent>Item with badge</DropdownMenuItemContent>
              <Badge>New</Badge>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Copy />
              Disabled item
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
              Checkbox item
            </DropdownMenuCheckboxItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Submenu</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub item one</DropdownMenuItem>
                <DropdownMenuItem>Sub item two</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Trash2 />
            Destructive item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const Default: Story = { render: () => <Demo /> }
export const Open: Story = { render: () => <Demo defaultOpen /> }
