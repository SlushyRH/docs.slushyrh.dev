import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Performance Against Itself</Heading>
      <Paragraph>performance between different serializers (builtin), async vs sync, save system vs mss, type converters vs custom classes</Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'MSS',
  section: 'overview',
  order: 1,
  Content: Content,
}