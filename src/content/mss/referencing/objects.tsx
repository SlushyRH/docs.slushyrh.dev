import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Title</Heading>
      <Paragraph>write about scene objects</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Scene Objects',
  section: 'guides',
  order: 0,
  Content: Content,
}