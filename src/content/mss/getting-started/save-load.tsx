import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Title</Heading>
      <Paragraph>walk through steps on save and load</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Saving & Loading',
  section: 'guides',
  order: 3,
  Content: Content,
}