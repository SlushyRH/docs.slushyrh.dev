import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Performance Against Other Assets</Heading>
      <Paragraph>performance against other save systems</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Other Assets',
  section: 'overview',
  order: 1,
  Content: Content,
}