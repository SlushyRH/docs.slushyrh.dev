import { Paragraph, Heading, Link, Code } from "@/components/ui";
import { List } from "@/components/ui/list";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>      
      <Heading>Unity Asset Store</Heading>
      <Paragraph>Ensure you have purchased from the <Link to="https://assetstore.unity.com/packages/slug/278863">Unity Asset Store</Link>.</Paragraph>
      <List type="ordered">
        <span>Open your Unity project.</span>
        <span>Go to <Code>Window/Package Manager</Code></span>
        <span>Select <b>My Assets</b>, find <b>Modular Save System</b>, and click <b>Import</b>.</span>
      </List>
      
      <Heading>Itch.io</Heading>
      <Paragraph>Ensure you have purchased from the <Link to="https://slushyrh.itch.io/modular-save-system">Itch.io</Link>.</Paragraph>
      <List type="ordered">
        <span>Open the <Link to="https://slushyrh.itch.io/modular-save-system">Itch.io</Link> page.</span>
        <span>Click <b>Download</b> to download the <Code>.unitypackage</Code> file.</span>
        <span>Open your Unity project.</span>
        <span>Drag and drop the <Code>.unitypackage</Code> into Unity.</span>
      </List>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Installing',
  section: 'guides',
  order: 0,
  Content: Content,
}