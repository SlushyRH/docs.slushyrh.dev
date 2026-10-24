import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Title</Heading>
      <Paragraph>write about prefabs objects</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Prefabs',
  section: 'guides',
  order: 0,
  Content: Content,
}