import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Base Module</Heading>
      <Paragraph>Paragraph</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Base Module',
  section: 'modules',
  order: -1,
  Content: Content,
}