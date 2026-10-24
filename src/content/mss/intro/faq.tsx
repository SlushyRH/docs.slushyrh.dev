import { Paragraph, Heading, Expandable } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>FAQ</Heading>
      <Paragraph>
        Frequently asked questions and their answers.
      </Paragraph>

      <Expandable title="Question">
        <Paragraph>Answer</Paragraph>
      </Expandable>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'FAQ',
  order: 1,
  section: 'overview',
  Content: Content
}