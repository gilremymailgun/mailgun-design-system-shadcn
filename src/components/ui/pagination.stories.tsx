import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPageSize,
  PaginationPrevious,
  PaginationSummary,
} from "./pagination"

const meta = {
  title: "Components/Pagination",
  component: Pagination,
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const total = 5

function Demo({ layout }: { layout: "complete" | "mirrored" | "no-toggle" }) {
  const [page, setPage] = React.useState(1)
  const [size, setSize] = React.useState(10)
  const go = (n: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    setPage(Math.min(total, Math.max(1, n)))
  }

  const controls = (
    <PaginationContent>
      <PaginationItem>
        <PaginationFirst href="#" onClick={go(1)} aria-disabled={page === 1} />
      </PaginationItem>
      <PaginationItem>
        <PaginationPrevious href="#" onClick={go(page - 1)} aria-disabled={page === 1} />
      </PaginationItem>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <PaginationItem key={n}>
          <PaginationLink href="#" isActive={n === page} onClick={go(n)}>
            {n}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationNext href="#" onClick={go(page + 1)} aria-disabled={page === total} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLast href="#" onClick={go(total)} aria-disabled={page === total} />
      </PaginationItem>
    </PaginationContent>
  )

  const pageSize = (
    <PaginationPageSize sizes={[10, 20, 30]} value={size} onValueChange={setSize} />
  )

  if (layout === "complete") {
    return (
      <Pagination>
        <div className="flex items-center gap-3">
          {pageSize}
          <PaginationSummary>1-2 of 2</PaginationSummary>
        </div>
        {controls}
      </Pagination>
    )
  }
  if (layout === "mirrored") {
    return (
      <Pagination>
        {controls}
        {pageSize}
      </Pagination>
    )
  }
  return (
    <Pagination className="justify-end">{controls}</Pagination>
  )
}

function Examples() {
  return (
    <div className="flex max-w-3xl flex-col gap-10 p-6">
      <Demo layout="complete" />
      <Demo layout="mirrored" />
      <Demo layout="no-toggle" />
    </div>
  )
}

export const AllLayouts: Story = { render: () => <Examples /> }

export const AllLayoutsDark: Story = {
  render: () => <Examples />,
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground">
        <Story />
      </div>
    ),
  ],
}
