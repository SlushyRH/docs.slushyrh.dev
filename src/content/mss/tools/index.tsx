import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Custom Tools</Heading>
      <Paragraph>Paragraph</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Tools',
  section: 'modules',
  order: 99,
  Content: Content,
}