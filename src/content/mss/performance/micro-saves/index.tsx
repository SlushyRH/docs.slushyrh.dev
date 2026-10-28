import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Micro Saves</Heading>
      <Paragraph>
        Developers often save their data in small yet high-frequency micro saves. This test saves a single PlayerState object 10 - 60 times a second to measure the rapid I/O calls.
      </Paragraph>
      <Paragraph>
        Select a platform from the sidebar to view specific performance benchmarks and hardware overhead.
      </Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Micro Saves',
  section: 'overview',
  order: 0,
  Content: Content,
}