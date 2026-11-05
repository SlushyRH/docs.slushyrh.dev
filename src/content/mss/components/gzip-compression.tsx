import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>GZip Compression</Heading>
      <Paragraph>Paragraph</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'GZip Compression',
  section: 'modules',
  order: 0,
  Content: Content,
}