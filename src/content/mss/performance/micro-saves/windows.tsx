import { Heading, Table, TableHeader, TableHead, TableBody, TableCell, TableRow, Alert } from "@/components/ui";
import { List } from "@/components/ui/list";
import type { DocPageMeta } from "@/lib/types";

function ResultsTable({ rows }: { rows: Array<[string, string, string, string, string, string]> }) {
  return (
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
        {rows.map(([configuration, saveTime, loadTime, saveGc, loadGc, fileSize]) => (
          <TableRow key={configuration}>
            <TableCell>{configuration}</TableCell>
            <TableCell>{saveTime}</TableCell>
            <TableCell>{loadTime}</TableCell>
            <TableCell>{saveGc}</TableCell>
            <TableCell>{loadGc}</TableCell>
            <TableCell>{fileSize}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function Content() {
  return (
    <>
      <Heading>Micro Saves (Windows)</Heading>
      <List type="unordered">
        <span><strong>CPU:</strong> Intel Core i5-9600K @ 3.70GHz</span>
        <span><strong>RAM:</strong> 32 GB</span>
        <span><strong>OS:</strong> Windows 11</span>
      </List>

      <Heading size="h2">Performance Results (Mono)</Heading>
      <ResultsTable
        rows={[
          ["JSON Serializer", "468.59", "5.24", "95.02", "4.20", "0.11"],
          ["MSS Serializer", "428.47", "4.89", "95.31", "4.20", "0.22"],
          ["XML Serializer", "469.81", "5.54", "95.70", "4.20", "0.42"],
        ]}
      />

      <Heading size="h2">Performance Results (IL2CPP)</Heading>
      <ResultsTable
        rows={[
          ["JSON Serializer", "465.44", "4.51", "102.90", "4.30", "0.11"],
          ["MSS Serializer", "404.02", "4.67", "103.20", "4.30", "0.07"],
          ["XML Serializer", "431.98", "4.68", "103.60", "4.30", "0.24"],
        ]}
      />
      
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