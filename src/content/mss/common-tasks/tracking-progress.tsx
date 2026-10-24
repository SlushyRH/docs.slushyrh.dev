import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Title</Heading>
      <Paragraph>mss progress</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Tracking Progress',
  section: 'guides',
  order: 0,
  Content: Content,
}