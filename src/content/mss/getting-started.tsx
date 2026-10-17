import { Paragraph, Title } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Title>Getting Started</Title>
      <Paragraph>Paragraph here about getting started</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  slug: 'getting-started',
  label: 'Getting Started',
  Content: Content
}