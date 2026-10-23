import { Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Itch Install</Heading>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Itch',
  order: 0,
  Content: Content
}