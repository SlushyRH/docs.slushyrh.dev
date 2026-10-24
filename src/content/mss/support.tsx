import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Support</Heading>
      <Paragraph>
        talk about differnet support channels
      </Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Support',
  order: 998,
  section: 'overview',
  Content: Content
}