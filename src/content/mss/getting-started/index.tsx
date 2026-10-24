import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Title</Heading>
      <Paragraph>walk through how to get started</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Getting Started',
  section: 'guides',
  order: -999,
  Content: Content,
}