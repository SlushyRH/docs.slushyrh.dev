import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Title</Heading>
      <Paragraph>Paragraph setup</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Setup',
  section: 'overview',
  order: 1,
  Content: Content,
}