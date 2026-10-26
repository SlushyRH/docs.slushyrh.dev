import { Paragraph, Heading, Image, Grid } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Custom Tools</Heading>
      <Grid> 
        <Paragraph>Paragraph</Paragraph>
        <Image src="/resources/tools/tools-window.png" />
      </Grid>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Tools',
  section: 'modules',
  order: 99,
  Content: Content,
}