import { Paragraph, Heading, Space, CodeBlock, Button, Link, Quote, Grid, Card, ScrollArea, Tabs, TabItem, Stepper, Step, Image, Video, Alert, Separator, Code, Flex, Checkbox, Table, TableHeader, TableRow, TableHead, TableCell, TableBody, Expandable } from "@/components/ui";
import type { DocPageMeta, ProjectMeta } from "@/lib/types";
import { FaUser } from "react-icons/fa";

const typescriptCodeExample = 
`function calculateTotal(items: { price: number; qty: number }[]): number {
    const taxRate = 0.08;
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    return subtotal * (1 + taxRate);
}

const cart = [{ price: 10.5, qty: 2 }, { price: 25.0, qty: 1 }];
console.log(\`Total: $\${calculateTotal(cart).toFixed(2)}\`);`;

const csharpCodeExample = 
`using System;
using System.Linq;

class Program {
    static void Main() {
        var numbers = new[] { 1, 2, 3, 4, 5 };
        double average = numbers.Where(n => n > 2).Average();
        Console.WriteLine($"Average: {average:F2}");
    }
}`;

const pythonCodeExample = 
`def get_discounted_prices(prices: list[float], discount: float) -> list[float]:
    tax_rate = 1.05
    return [round(p * (1 - discount) * tax_rate, 2) for p in prices if p > 10.0]

items = [5.5, 15.0, 45.99]
print("Final prices:", get_discounted_prices(items, 0.15))`;

function Content({ project }: { project: ProjectMeta }) {
  return (
    <>
      <Heading size='h1' noMargin>Heading 1</Heading>
      <Heading size='h2' noMargin>Heading 2</Heading>
      <Heading size='h3' noMargin>Heading 3</Heading>
      <Heading size='h4' noMargin>Heading 4</Heading>
      <Heading size='h5' noMargin>Heading 5</Heading>
      <Heading size='h6' noMargin>Heading 6</Heading>

      <Space space={12} />

      <Heading>Paragraphs</Heading>
      <Paragraph>
        This is a paragraph, it's pretty basic. You can write <b>bold</b>, <i>italics</i>, and anything else since it's normal HTML.
        You can also include links, either to other pages <Link to={`/${project}/intro`}>another page</Link>, or
        an <Link to="https://slushyrh.dev" sameTab={false}>external page</Link>.
      </Paragraph>

      <Heading>Code Block</Heading>
      <Paragraph>
        You can do <Code>Inline Code</Code> text as well as full code blocks below.
      </Paragraph>
      <CodeBlock language="csharp" code={pythonCodeExample} showHeader hideNumbers />
      <CodeBlock tabs={[
          { name: 'Typescript', code: typescriptCodeExample, language: "typescript" },
          { name: 'C#', code: csharpCodeExample, language: "csharp", highlightLines: [8] },
        ]}
      />

      <Heading>Buttons</Heading>
      <Flex orientation="vertical">
        <ScrollArea>
          <Flex center>
            <p>Text:</p>
            <Button variant='default'>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </Flex>
          <Flex center>
            <p>Text + Icon: </p>
            <Button variant='default'><FaUser /> Default</Button>
            <Button variant="secondary"><FaUser /> Secondary</Button>
            <Button variant="outline"><FaUser /> Outline</Button>
            <Button variant="ghost"><FaUser /> Ghost</Button>
          </Flex>
          <Flex center>
            <p>Icon: </p>
            <Button variant='default' size='icon'><FaUser /></Button>
            <Button variant="secondary" size='icon'><FaUser /></Button>
            <Button variant="outline" size='icon'><FaUser /></Button>
            <Button variant="ghost" size='icon'><FaUser /></Button>
          </Flex>
          <Flex center>
            <p>Tooltip: </p>
            <Button variant='default' size='icon' tooltip='This has a tooltip'><FaUser /></Button>
            <Button variant='default' tooltip='This has a tooltip' tooltipSide='bottom'>Default</Button>
          </Flex>
        </ScrollArea>
      </Flex>
      
      <Checkbox checked label="You can add a label." />

      <Heading>Quote</Heading>
      <Quote>
        <Heading size='h2' className="pt-0">Custom Content</Heading>
        <Paragraph>
          You can put any content inside a quote.
        </Paragraph>
        <Button variant='outline'>Click Me</Button>
      </Quote>

      <Heading>Grids & Cards</Heading>
      <Grid>
        <Card>
          <Paragraph>
            This is the left column.
          </Paragraph>
        </Card>

        <Card>
          <Paragraph className="text-center">
            This is the center column.
          </Paragraph>
        </Card>

        <Card>
          <Paragraph className="text-right">
            This is the right column.
          </Paragraph>
        </Card>
      </Grid>

      <Heading>Scroll Area</Heading>
      <Card>
        <ScrollArea className='h-24'>
          <Paragraph>Paragraph 1 is the first paragraph.</Paragraph>
          <Paragraph>Paragraph 2 is the NOT first paragraph.</Paragraph>
          <Paragraph>Paragraph 3 is the NOT first paragraph.</Paragraph>
          <Paragraph>Paragraph 4 is the NOT first paragraph.</Paragraph>
          <Paragraph>Paragraph 5 is the NOT first paragraph.</Paragraph>
        </ScrollArea>
      </Card>

      <Heading>Tabs</Heading>
      <Tabs>
        <TabItem title="First">
          This is tab item 1
        </TabItem>
        <TabItem title="Second">
          This is tab item 2
        </TabItem>
        <TabItem title="Third">
          This is tab item 3
        </TabItem>
      </Tabs>

      <Heading>Steps</Heading>
      <Stepper>
        <Step>Step 1.1<br/>Step 1.2<br/>Step 1.3<br/></Step>
        <Step>Step 2</Step>
        <Step>Step 3</Step>
      </Stepper>

      <Heading>Images & Videos</Heading>
      <Video autoPlay loop src="https://images-ext-1.discordapp.net/external/ehQLPqtuj2P5BU8IP8hqlwcopyRvzvLJI42pYuvL6p4/https/media.tenor.com/1hb35pgZbqIAAAPo/nailong-dwerk.mp4" />
      <Image caption="My Pizza mmmmmm" src="https://images.steamusercontent.com/ugc/782992988808137557/3B9CC459971B9A7E920B5C71D380C18F10072B44/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" />

      <Heading>Spaces & Separators</Heading>
      Above Space
      <Space />
      Below Space
      <Separator />

      <Heading>Alerts</Heading>
      <Grid maxColumns={2}>
        <Alert type="info">
          Info details here.
        </Alert>
        <Alert type="info" title="Custom Title">
          Info details here.
        </Alert>
        <Alert type="tip">
          tip details here.
        </Alert>
        <Alert type="tip" title="Custom Title">
          tip details here.
        </Alert>
        <Alert type="warning">
          warning details here.
        </Alert>
        <Alert type="warning" title="Custom Title">
          warning details here.
        </Alert>
        <Alert type="caution">
          caution details here.
        </Alert>
        <Alert type="caution" title="Custom Title">
          caution details here.
        </Alert>
      </Grid>

      <Heading>Lists</Heading>

      <Heading>Tables</Heading>
      <ScrollArea>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-37.5">Property</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead align="right">Required</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">projectId</TableCell>
              <TableCell>string</TableCell>
              <TableCell>The unique identifier for the project.</TableCell>
              <TableCell>Yes</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">className</TableCell>
              <TableCell>string</TableCell>
              <TableCell>Optional Tailwind CSS classes to append.</TableCell>
              <TableCell>No</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>

      <Heading>Expandable</Heading>
      <Expandable title="Expand Me" icon={FaUser}>
        <Paragraph>Add any content here</Paragraph>
      </Expandable>
    </>
  );
}

export const page: DocPageMeta = {
  label: 'Demo',
  order: 1,
  Content: Content
}