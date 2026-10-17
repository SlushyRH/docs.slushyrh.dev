import { Paragraph, Title } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Title>Save System</Title>
      <Paragraph>Paragraph about the save system</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  slug: 'save-system',
  label: 'Save System',
  Content: Content
}