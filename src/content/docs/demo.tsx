import { Paragraph, Heading, Space, CodeBlock, Button } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";
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

function Content() {
  return (
    <>
      <Heading size='h1' className="pb-0">Heading 1</Heading>
      <Heading size='h2' className="pb-0">Heading 2</Heading>
      <Heading size='h3' className="pb-0">Heading 3</Heading>
      <Heading size='h4' className="pb-0">Heading 4</Heading>
      <Heading size='h5' className="pb-0">Heading 5</Heading>
      <Heading size='h6' className="pb-0">Heading 6</Heading>

      <Space space={12} />

      <Heading>Paragraphs</Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris cursus dui ut urna finibus, et porttitor dolor ultrices.
        Sed eu lectus non elit placerat egestas vel eget elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse potenti.
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        Ut et justo ullamcorper, mattis nunc id, commodo nulla. Nulla facilisi. Morbi sagittis, enim quis vehicula dignissim,
        eros est rutrum libero, eget fringilla velit nunc ultricies neque. Praesent id tempor dolor, at aliquet risus. Etiam orci lacus,
        eleifend eu sapien nec, ullamcorper efficitur est. Nulla vel porta arcu. Cras vel risus feugiat, aliquet quam sit amet, vulputate augue.
        Mauris bibendum cursus felis sit amet rutrum. Nullam pretium accumsan luctus. Pellentesque pharetra viverra nunc non pharetra.
      </Paragraph>

      <Paragraph>
        Ut consectetur ligula sed nisi egestas tincidunt. Integer et ligula at enim eleifend dignissim.
        Nullam imperdiet cursus blandit. Suspendisse potenti. Donec congue tempus turpis eu auctor.
        Donec pellentesque vitae massa eget condimentum. Integer dapibus massa mi, vitae sodales erat interdum quis.
        Nunc arcu leo, blandit ac aliquet vitae, fermentum ac justo. Integer placerat convallis sapien. Phasellus non magna augue. 
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
      </div>
    </>
  )
}

export const page: DocPageMeta = {
  slug: 'demo',
  label: 'Basic Demo',
  order: 1,
  Content: Content
}