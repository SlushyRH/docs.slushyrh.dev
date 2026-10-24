import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Title</Heading>
      <Paragraph>write about iserializer and shit</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Custom Serializers',
  section: 'guides',
  order: 0,
  Content: Content,
}