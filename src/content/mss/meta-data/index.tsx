import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Title</Heading>
      <Paragraph>write about meta data shit</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Meta Data',
  section: 'guides',
  order: 0,
  Content: Content,
}