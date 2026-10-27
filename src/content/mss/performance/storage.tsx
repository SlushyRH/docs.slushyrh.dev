import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>File Storage</Heading>
      <Paragraph>
        Measure the file storage across different in-built serializers, compression and encryption using the stress test scene.
      </Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'File Storage',
  section: 'overview',
  order: 2,
  Content: Content,
}