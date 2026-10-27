import { Paragraph, Heading, Table, TableHeader, TableHead, TableBody, TableCell, TableRow, Alert } from "@/components/ui";
import { List } from "@/components/ui/list";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Micro Saves (Windows)</Heading>
      <Paragraph>
        The following benchmarks reflect performance on a Standalone Windows 64 build. Because these operations are lightweight, the test measures 100 iterations to accurately capture pipeline overhead like stream initialization and encryption.
      </Paragraph>
      <List type="unordered">
        <span><strong>CPU:</strong> Intel Core i5-9600K @ 3.70GHz</span>
        <span><strong>RAM:</strong> 32 GB</span>
        <span><strong>OS:</strong> Windows 11</span>
        <span><strong>Context:</strong> Standalone Windows 64</span>
      </List>

      <Heading size="h2">Performance Results</Heading>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Configuration</TableHead>
            <TableHead>Save Time (ms)</TableHead>
            <TableHead>Load Time (ms)</TableHead>
            <TableHead>Save GC (KB)</TableHead>
            <TableHead>Load GC (KB)</TableHead>
            <TableHead>File Size (KB)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell><strong>MSS Micro Save (Json)</strong></TableCell>
            <TableCell>468.59</TableCell>
            <TableCell>5.24</TableCell>
            <TableCell>95.02</TableCell>
            <TableCell>4.20</TableCell>
            <TableCell>0.11</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>MSS Micro Save (Mss)</strong></TableCell>
            <TableCell>428.47</TableCell>
            <TableCell>4.89</TableCell>
            <TableCell>95.31</TableCell>
            <TableCell>4.20</TableCell>
            <TableCell>0.22</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>MSS Micro Save (Xml)</strong></TableCell>
            <TableCell>469.81</TableCell>
            <TableCell>5.54</TableCell>
            <TableCell>95.70</TableCell>
            <TableCell>4.20</TableCell>
            <TableCell>0.42</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      <Alert type="info" noMargin>
        <strong>Note:</strong> To calculate the exact overhead per frame, execution times and GC allocations from the Unity Test Runner should be divided by the 100 iterations performed during the test.
      </Alert>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Windows',
  section: 'overview',
  order: 1,
  Content: Content,
}