import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Title</Heading>
      <Paragraph>walk through how to install</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Installing',
  section: 'guides',
  order: 0,
  Content: Content,
}