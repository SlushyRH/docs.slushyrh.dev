import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Introduction</Heading>
      <Paragraph>
        talk about what mss is?
      </Paragraph>

      <Heading>Core Pillars</Heading>
      <Paragraph>
        talk about how mss is built upon 3 core pillars
      </Paragraph>

      <Heading size='h2'>Modularity</Heading>
      <Paragraph>
        talk about mss is modular, and how to works
      </Paragraph>

      <Heading size='h2'>Ease of Use</Heading>
      <Paragraph>
        talk bout the ease of us of mss
      </Paragraph>

      <Heading size='h2'>No-Breaks</Heading>
      <Paragraph>
        talk about the no-break promise
      </Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Intoduction',
  order: -9999,
  section: 'overview',
  Content: Content
}