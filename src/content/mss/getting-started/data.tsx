import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Title</Heading>
      <Paragraph>walk through set and get methods</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Data Handling',
  section: 'guides',
  order: 2,
  Content: Content,
}