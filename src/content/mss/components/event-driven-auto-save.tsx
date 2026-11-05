import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Event Driven Auto Save</Heading>
      <Paragraph>Paragraph</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Event Driven Auto Save',
  section: 'modules',
  order: 0,
  Content: Content,
}