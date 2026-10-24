import { Paragraph, Heading } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Introduction</Heading>
      <Paragraph>
        Snowcap Documentation is a custom built documentation site that I built for my self. I built this as I previously used Gitbook but after 
        the removal of the custom domain option in the free tier and the aggresive AI push, I wanted to switch. After looking at the options, I decided I
        will build my own, for full control over the styling and functionality of the site.
      </Paragraph>

      <Paragraph>
        Talk about installing/copying.
      </Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Introduction',
  order: -1000,
  section: 'overview',
  Content: Content
}