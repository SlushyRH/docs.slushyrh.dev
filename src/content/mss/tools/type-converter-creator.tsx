import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Type Converter Creator</Heading>
      <Paragraph>do a step by step using stepper on how to use with images and shit</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Type Converter Creator',
  section: 'modules',
  order: 0,
  Content: Content,
}