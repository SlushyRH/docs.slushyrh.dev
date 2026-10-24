import { Paragraph, Heading, CodeBlock, Link } from "@/components/ui";
import type { DocPageMeta, ProjectMeta } from "@/lib/types";

const headingCode = `<Heading size='h1'>Heading 1</Heading>
<Heading size='h2'>Heading 2</Heading>
<Heading size='h3'>Heading 3</Heading>
<Heading size='h4'>Heading 4</Heading>
<Heading size='h5'>Heading 5</Heading>
<Heading size='h6'>Heading 6</Heading>`;

const paragraphCode = `<Paragraph>
  This is a paragraph, it's pretty basic. You can write <b>bold</b>, <i>italics</i>, and anything else since it's normal HTML.
  You can also include links, either to other pages <Link to={\`/\${project.id}/intro\`}>another page</Link>, or
  an <Link to="https://slushyrh.dev">external page</Link>.
</Paragraph>`;

function Content({ project }: { project: ProjectMeta }) {
  return (
    <>
      <Heading size='h1' noMargin>Heading 1</Heading>
      <Heading size='h2' noMargin>Heading 2</Heading>
      <Heading size='h3' noMargin>Heading 3</Heading>
      <Heading size='h4' noMargin>Heading 4</Heading>
      <Heading size='h5' noMargin>Heading 5</Heading>
      <Heading size='h6'>Heading 6</Heading>

      <Paragraph>
        This is a paragraph, it's pretty basic. You can write <b>bold</b>, <i>italics</i>, and anything else since it's normal HTML.
        You can also include links, either to other pages <Link to={`/${project.id}/intro`}>another page</Link>, or
        an <Link to="https://slushyrh.dev">external page</Link>.
      </Paragraph>
      
      <CodeBlock tabs={[
          { name: 'Heading', code: headingCode, language: "html" },
          { name: 'Paragraph', code: paragraphCode, language: "html" },
        ]}
      />

    </>
  )
}

export const page: DocPageMeta = {
  label: 'Text',
  order: -1000,
  section: 'components',
  Content: Content
}