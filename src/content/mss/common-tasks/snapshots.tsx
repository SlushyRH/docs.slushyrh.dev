import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Title</Heading>
      <Paragraph>talk about how to use ISnapshots</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Snapshots',
  section: 'guides',
  order: 0,
  Content: Content,
}