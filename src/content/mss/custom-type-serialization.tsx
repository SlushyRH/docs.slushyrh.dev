import { Paragraph, Heading, Table, TableHeader, TableHead, TableBody, TableCell, TableRow, Link } from "@/components/ui";
import type { DocPageMeta, ProjectMeta } from "@/lib/types";

function Content({ project }: { project: ProjectMeta }) {
  return (
    <>
      <Heading>Customizing Serialization</Heading>
      <Paragraph>
        If you need to serialize a class, struct, or component that isn't supported out of the box, or if you want to alter the default behavior of supported types, Modular Save System provides two powerful approaches: <strong>Attributes</strong> and <strong>Custom Type Converters</strong>.
      </Paragraph>

      <Heading size="h2">Serialization Attributes</Heading>
      <Paragraph>
        If you have access to the source code of the type you want to save, you can use built-in attributes to precisely control what gets serialized and how members are handled.
      </Paragraph>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-55">Attribute</TableHead>
            <TableHead className="w-45">Default Value</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Link to="#">[SerializationSettings]</Link>
            </TableCell>
            <TableCell><code>SerializationFlag.Default</code></TableCell>
            <TableCell>
              Applied to a class or struct. Allows you to define what members are targeted using <code>SerializationFlag</code> (e.g., <code>PublicFields</code>, <code>Everything</code>, <code>PropertiesOnly</code>) and toggle global flag overrides for attributes.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link to="#">[ForceSerialize]</Link>
            </TableCell>
            <TableCell className="text-gray-400 italic">N/A</TableCell>
            <TableCell>
              Forces a specific field or property to be saved, bypassing default access modifier restrictions (including SerializationSettings) like private or protected visibility.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link to="#">[DontSerialize]</Link>
            </TableCell>
            <TableCell className="text-gray-400 italic">N/A</TableCell>
            <TableCell>
              Explicitly prevents a specific field or property from being serialized.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link to="#">[SerializedKey]</Link>
            </TableCell>
            <TableCell className="text-gray-400 italic">Default Member Name</TableCell>
            <TableCell>
              Overrides the default member name in the save data, allowing you to refactor code variable names without invalidating existing player save files. <br/>*You can add multiple to one variable if you have multiple previous keys.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Paragraph>Add a new 'FormerSerializedKey(string[])', and basically it will make it so if there isn't the SerializedKey, it will try find any key that matches one of the array and load that into the variable.</Paragraph>

      <Heading size="h2">Custom Type Converters</Heading>
      <Paragraph>
        For third-party assets, Unity built-in components, or complex objects where you cannot modify the source code to add attributes, you can implement a Custom Type Converter.
      </Paragraph>
      <Paragraph>
        To make writing custom converters effortless, MSS includes a built-in <Link to={`/${project.id}/tools/type-converter-creator`}>Type Converter Creator</Link> Editor Window. This will generate a file for your type converter, in which you can edit anytime if needed.
      </Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Custom Type Serialization',
  section: 'guides',
  order: 0,
  Content: Content,
}