import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

// function Content({ project }: { project: ProjectMeta }) {
function Content() {
  return (
    <>
      <Heading>Title</Heading>
      <Paragraph>Paragraph</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Page',
  Content: Content,
  order: 0,
}