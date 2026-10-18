import { Paragraph, Heading, Space, CodeBlock, Button, Link, Quote, Columns, Card, ScrollArea, Tabs, TabItem, Stepper, Step, Image, Video, Alert, Separator } from "@/components/ui";
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
      <Heading size='h1' className="pb-0 pt-0">Heading 1</Heading>
      <Heading size='h2' className="pb-0 pt-0">Heading 2</Heading>
      <Heading size='h3' className="pb-0 pt-0">Heading 3</Heading>
      <Heading size='h4' className="pb-0 pt-0">Heading 4</Heading>
      <Heading size='h5' className="pb-0 pt-0">Heading 5</Heading>
      <Heading size='h6' className="pb-0 pt-0">Heading 6</Heading>

      <Space space={12} />

      <Heading>Paragraphs</Heading>
      <Paragraph>
        This is a paragraph, it's pretty basic. You can write <b>bold</b>, <i>italics</i>, and anything else since it's normal HTML.
        You can also include links, either to other pages <Link href={`/${project.slug}/intro`}>another page</Link>, or
        an <Link href="https://slushyrh.dev" sameTab={false}>external page</Link>.
      </Paragraph>

      <Heading>Code Block</Heading>
      <CodeBlock tabs={[
          { name: 'Typescript', code: typescriptCodeExample, language: "typescript" },
          { name: 'C#', code: csharpCodeExample, language: "csharp" },
          { name: 'Python', code: pythonCodeExample, language: "python", highlightLines: [3] },
        ]}
      />

      <Heading>Buttons</Heading>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <p>Text:</p>
          <Button variant='default'>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="flex items-center gap-2">
          <p>Text + Icon: </p>
          <Button variant='default'><FaUser /> Default</Button>
          <Button variant="secondary"><FaUser /> Secondary</Button>
          <Button variant="outline"><FaUser /> Outline</Button>
          <Button variant="ghost"><FaUser /> Ghost</Button>
        </div>
        <div className="flex items-center gap-2">
          <p>Icon: </p>
          <Button variant='default' size='icon'><FaUser /></Button>
          <Button variant="secondary" size='icon'><FaUser /></Button>
          <Button variant="outline" size='icon'><FaUser /></Button>
          <Button variant="ghost" size='icon'><FaUser /></Button>
        </div>
        <div className="flex items-center gap-2">
          <p>Tooltip: </p>
          <Button variant='default' size='icon' tooltip='This has a tooltip'><FaUser /></Button>
          <Button variant='default' tooltip='This has a tooltip' tooltipSide='bottom'>Default</Button>
        </div>
      </div>

      <Heading>Quote</Heading>
      <Quote>
        <Heading size='h2' className="pt-0">Custom Content</Heading>
        <Paragraph>
          You can put any content inside a quote.
        </Paragraph>
        <Button variant='outline'>Click Me</Button>
      </Quote>

      <Heading>Columns & Cards</Heading>
      <Columns>
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
      </Columns>

      <Heading>Scroll Area</Heading>
      <Card className="">
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

      <Stepper>
        <Step>Step 1.1<br/>Step 1.2<br/>Step 1.3<br/></Step>
        <Step>Step 2</Step>
        <Step>Step 3</Step>
      </Stepper>

      <Heading>Images & Videos</Heading>
      <Video autoPlay loop src="https://images-ext-1.discordapp.net/external/ehQLPqtuj2P5BU8IP8hqlwcopyRvzvLJI42pYuvL6p4/https/media.tenor.com/1hb35pgZbqIAAAPo/nailong-dwerk.mp4" />
      <Image caption="The one and only lord Kim Jon Un (looking pretty cute)" src="https://media.discordapp.net/attachments/743447045196480512/1554470946042159184/image.png?ex=6ad56522&is=6ad413a2&hm=801624357b9928300e0d9c68559b5bdbe30fb3e98c04907311e27937ec54a722&=&format=webp&quality=lossless" />
    
      <Heading>Spaces & Separators</Heading>
      <Space />
      <Separator />

      <Heading>Alerts</Heading>
      <Columns>
        <Alert type="info">
          Info details here.
        </Alert>
        <Alert type="info" title="Custom Title">
          Info details here.
        </Alert>
      </Columns>
      <Columns>
        <Alert type="tip">
          tip details here.
        </Alert>
        <Alert type="tip" title="Custom Title">
          tip details here.
        </Alert>
      </Columns>
      <Columns>
        <Alert type="warning">
          warning details here.
        </Alert>
        <Alert type="warning" title="Custom Title">
          warning details here.
        </Alert>
      </Columns>
      <Columns>
        <Alert type="caution">
          caution details here.
        </Alert>
        <Alert type="info" title="Custom Title">
          caution details here.
        </Alert>
      </Columns>
    </>
  )
}

export const page: DocPageMeta = {
  slug: 'demo',
  label: 'Basic Demo',
  order: 1,
  Content: Content
}