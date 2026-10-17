import { Paragraph, Title } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Title>Installation</Title>
      <Paragraph>Paragraph here about installation</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  slug: 'installation',
  label: 'Installation',
  Content: Content
}