import { Paragraph, Heading, Code } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Stress Test</Heading>
      <Paragraph>
        To ensure the Modular Save System (MSS) scales efficiently for large projects, we enforce a rigorous stress test profiling the execution time and Garbage Collection (GC) allocations. The benchmark generates a physical Unity scene containing 10,000 deeply nested and wide-loaded GameObjects, equipped with custom data structures and arrays.
      </Paragraph>
      <Paragraph>
        The <Code>MssReferenceManager</Code> crawls this hierarchy, identifying and mapping 28,021 unique component references before executing the serialization pipeline. 
      </Paragraph>
      <Paragraph>
        Select a platform from the sidebar to view specific performance benchmarks and hardware overhead.
      </Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Stress Test',
  section: 'overview',
  order: -1,
  Content: Content,
}