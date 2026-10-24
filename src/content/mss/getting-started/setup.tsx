import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Title</Heading>
      <Paragraph>walk through steps on how to setup the scene and files</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Setup',
  section: 'guides',
  order: 0,
  Content: Content,
}