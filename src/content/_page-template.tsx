import { Paragraph, Title } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Title>Title</Title>
      <Paragraph>Paragraph</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  slug: 'page',
  label: 'Page',
  Content: Content
}