import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>AES Encryption</Heading>
      <Paragraph>Paragraph</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'AES Encryption',
  section: 'modules',
  order: 0,
  Content: Content,
}