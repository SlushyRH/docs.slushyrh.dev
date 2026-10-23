import { Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Install</Heading>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Install',
  order: 0,
  Content: Content
}