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
      <Heading>Micro Saves (Linux)</Heading>
      <List type="unordered">
        <span><strong>CPU:</strong> Intel Core i5-8300H @ 2.30 GHz, 8 logical processors</span>
        <span><strong>RAM:</strong> 7,809 MB</span>
        <span><strong>OS:</strong> Linux Mint</span>
      </List>

      <Heading size="h2">Performance Results (Mono)</Heading>
      <ResultsTable
        rows={[
          ["JSON", "163.22", "1.23", "90.14", "3.52", "0.11"],
          ["MSS", "78.91", "1.37", "90.43", "3.52", "0.07"],
          ["XML", "97.05", "1.22", "90.82", "3.52", "0.24"],
        ]}
      />

      <Heading size="h2">Performance Results (IL2CPP)</Heading>
      <ResultsTable
        rows={[
          ["JSON", "173.12", "1.07", "95.61", "3.52", "0.11"],
          ["MSS", "55.20", "1.00", "95.90", "3.52", "0.07"],
          ["XML", "130.85", "0.97", "96.29", "3.52", "0.24"],
        ]}
      />
      
      <Alert type="info" noMargin>
        <strong>Note:</strong> To calculate the exact overhead per frame, execution times and GC allocations from the Unity Test Runner should be divided by the 100 iterations performed during the test.
      </Alert>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Linux',
  section: 'overview',
  order: 1,
  Content: Content,
}