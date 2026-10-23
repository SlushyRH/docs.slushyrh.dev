import { Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Unity Install</Heading>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Unity',
  order: 0,
  Content: Content
}