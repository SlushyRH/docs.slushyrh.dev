import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Title</Heading>
      <Paragraph>talk about performance in mss</Paragraph>

      <Heading>Benchmark Setup</Heading>
      <Paragraph>show code for bench mark setup</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Performance',
  section: 'overview',
  order: 1,
  Content: Content,
}