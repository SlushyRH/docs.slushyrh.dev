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
      <Heading>Stress Test (Windows)</Heading>

      <Heading size="h2">Test Environment</Heading>
      <List type="unordered">
        <span><strong>CPU:</strong> Intel Core i5-9600K @ 3.70GHz</span>
        <span><strong>RAM:</strong> 32 GB</span>
        <span><strong>OS:</strong> Windows 11</span>
      </List>

      <Paragraph>
        The tables below detail the performance impact of every included serialization, compression, and encryption combination when processing 10,000 components.
      </Paragraph>

      <Heading size="h2">Performance Results (Mono)</Heading>
      <ResultsTable
        rows={[
          ["JSON Serializer", "1167.82", "710.00", "1521.93", "1027.05", "2021.38"],
          ["JSON + AES", "1202.26", "729.20", "1521.98", "1027.13", "2021.41"],
          ["JSON + GZip", "1272.24", "686.77", "1521.95", "1027.04", "345.52"],
          ["JSON + GZip + AES", "1214.72", "690.95", "1521.99", "1027.10", "345.27"],
          ["MSS Serializer", "1132.52", "673.12", "1522.30", "1015.46", "1587.78"],
          ["MSS + AES", "1221.58", "698.43", "1522.35", "1015.53", "1587.81"],
          ["MSS + GZip", "1264.55", "670.45", "1522.32", "1015.46", "335.90"],
          ["MSS + GZip + AES", "1193.12", "673.86", "1522.37", "1015.50", "335.69"],
          ["XML Serializer", "1181.43", "1279.97", "1521.94", "1549.80", "3095.65"],
          ["XML + AES", "1244.31", "1338.62", "1521.99", "1549.88", "3095.67"],
          ["XML + GZip", "1281.60", "1383.47", "1521.96", "1549.81", "367.94"],
          ["XML + GZip + AES", "1252.34", "1331.05", "1522.00", "1549.88", "367.97"],
        ]}
      />

      <Heading size="h2">Performance Results (IL2CPP)</Heading>
      <ResultsTable
        rows={[
          ["JSON Serializer", "3352.99", "777.00", "1820.00", "1260.00", "2017.00"],
          ["JSON + AES", "3300.66", "768.40", "1820.00", "1260.00", "2017.00"],
          ["JSON + GZip", "3300.11", "730.50", "1820.00", "1260.00", "348.00"],
          ["JSON + GZip + AES", "3287.10", "729.20", "1820.00", "1260.00", "348.00"],
          ["MSS Serializer", "3224.02", "684.56", "1820.00", "1250.00", "1587.00"],
          ["MSS + AES", "3332.34", "692.15", "1820.00", "1250.00", "1587.00"],
          ["MSS + GZip", "3299.41", "671.02", "1820.00", "1250.00", "338.00"],
          ["MSS + GZip + AES", "3290.42", "667.11", "1820.00", "1250.00", "338.00"],
          ["XML Serializer", "3334.52", "935.65", "1820.00", "1720.00", "3092.00"],
          ["XML + AES", "3376.09", "996.34", "1820.00", "1720.00", "3092.00"],
          ["XML + GZip", "3386.16", "979.41", "1820.00", "1720.00", "369.00"],
          ["XML + GZip + AES", "3653.29", "942.90", "1820.00", "1720.00", "369.00"],
        ]}
      />

      <Alert type="info" noMargin>
        <strong>Note:</strong> These benchmarks measure raw synchronous execution throughput. In production, MSS utilizes thread-safe asynchronous I/O to process these heavy serialization workloads in the background without blocking the main Unity thread.
      </Alert>
    </>
  );
}

export const page: DocPageMeta = {
  label: 'Windows',
  section: 'overview',
  order: 0,
  Content: Content,
};
