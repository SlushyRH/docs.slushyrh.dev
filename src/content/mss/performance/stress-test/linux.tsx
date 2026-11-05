import { Paragraph, Heading, Table, TableHeader, TableHead, TableBody, TableCell, TableRow, Alert } from "@/components/ui";
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
      <Heading>Stress Test (Linux)</Heading>

      <Heading size="h2">Test Environment</Heading>
      <List type="unordered">
        <span><strong>CPU:</strong> Intel Core i5-8300H @ 2.30 GHz, 8 logical processors</span>
        <span><strong>RAM:</strong> 7,809 MB</span>
        <span><strong>OS:</strong> Linux Mint 22.3 64-bit</span>
      </List>

      <Paragraph>
        The tables below detail the performance impact of every included serialization, compression, and encryption combination when processing 10,000 components. Values are averages over 5 samples.
      </Paragraph>

      <Heading size="h2">Performance Results (Mono)</Heading>
      <ResultsTable
        rows={[
          ["JSON", "1827.98", "2739.55", "1521.87", "2635.35", "2021.38"],
          ["JSON + AES", "1925.84", "2645.08", "1521.92", "2635.44", "2021.41"],
          ["JSON + GZip", "1895.03", "2721.24", "1521.89", "2635.42", "345.26"],
          ["JSON + GZip + AES", "1914.66", "2762.97", "1521.93", "2635.43", "345.31"],
          ["MSS", "1843.40", "2935.46", "1522.24", "2623.81", "1587.79"],
          ["MSS + AES", "1944.94", "2666.44", "1522.29", "2623.88", "1587.81"],
          ["MSS + GZip", "2876.79", "2927.03", "1522.26", "2623.84", "335.61"],
          ["MSS + GZip + AES", "1748.32", "2776.63", "1522.30", "2623.86", "336.08"],
          ["XML", "1626.47", "3378.97", "1521.88", "3158.15", "3009.71"],
          ["XML + AES", "1564.07", "3443.02", "1521.92", "3158.23", "3009.73"],
          ["XML + GZip", "1597.07", "3587.31", "1521.90", "3158.16", "362.45"],
          ["XML + GZip + AES", "1656.21", "3493.32", "1521.94", "3158.22", "362.72"],
        ]}
      />

      <Heading size="h2">Performance Results (IL2CPP)</Heading>
      <ResultsTable
        rows={[
          ["JSON", "2966.27", "2588.97", "1865.13", "3200.83", "2021.38"],
          ["JSON + AES", "3058.21", "2574.35", "1865.18", "3200.91", "2021.41"],
          ["JSON + GZip", "3231.90", "2540.05", "1865.15", "3200.82", "345.36"],
          ["JSON + GZip + AES", "3213.71", "2691.77", "1865.19", "3200.90", "345.48"],
          ["MSS", "2989.08", "2471.30", "1865.51", "3189.23", "1587.79"],
          ["MSS + AES", "2940.38", "2678.67", "1865.55", "3189.33", "1587.81"],
          ["MSS + GZip", "2992.71", "2523.78", "1865.52", "3189.24", "335.95"],
          ["MSS + GZip + AES", "2937.87", "2460.48", "1865.56", "3189.33", "336.00"],
          ["XML", "3081.48", "2754.74", "1865.14", "3607.37", "3009.71"],
          ["XML + AES", "3046.15", "2877.45", "1865.19", "3607.51", "3009.73"],
          ["XML + GZip", "3055.64", "2870.67", "1865.16", "3607.39", "362.23"],
          ["XML + GZip + AES", "3015.50", "2990.90", "1865.20", "3607.43", "362.63"],
        ]}
      />

      <Alert type="info" noMargin>
        <strong>Note:</strong> These benchmarks measure raw synchronous execution throughput. In production, MSS utilizes thread-safe asynchronous I/O to process these heavy serialization workloads in the background without blocking the main Unity thread.
      </Alert>
    </>
  );
}

export const page: DocPageMeta = {
  label: 'Linux',
  section: 'overview',
  order: 0,
  Content: Content,
};
