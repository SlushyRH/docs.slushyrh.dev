import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Save System</Heading>
      <Paragraph>Paragraph about the save system</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  slug: 'save-system',
  label: 'Save System',
  Content: Content
}