import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading size='h1'>Introduction</Heading>
      <Paragraph>
        This is an introduction to my custom documentation site.
      </Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Intoduction',
  order: 0,
  Content: Content
}