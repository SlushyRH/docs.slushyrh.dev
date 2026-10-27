import { Paragraph, Heading, Table, TableHeader, TableHead, TableBody, TableCell, TableRow, Code, Alert } from "@/components/ui";
import { List } from "@/components/ui/list";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Stress Test (Sync)</Heading>
      <Paragraph>
        To ensure the Modular Save System (MSS) scales efficiently for large projects, we enforce a rigorous stress test profiling the execution time and Garbage Collection (GC) allocations. The benchmark generates a physical Unity scene containing 10,000 deeply nested and wide-loaded GameObjects, equipped with custom data structures and arrays.
      </Paragraph>
      <Paragraph>
        The <Code>MssReferenceManager</Code> crawls this hierarchy, identifying and mapping 28,021 unique component references before executing the serialization pipeline. 
      </Paragraph>

      <Heading size="h2">Test Environment</Heading>
      <Paragraph>
        These benchmarks were recorded in a Standalone Windows 64 build, yielding significantly faster execution times than the standard Editor PlayMode.
      </Paragraph>
      <List type="unordered">
        <span><strong>CPU:</strong> Intel Core i5-9600K @ 3.70GHz</span>
        <span><strong>RAM:</strong> 32 GB</span>
        <span><strong>OS:</strong> Windows 11</span>
        <span><strong>Context:</strong> Standalone Windows 64</span>
      </List>

      <Heading size="h2">Performance Results</Heading>
      <Paragraph>
        The table below details the performance impact of every included serialization, compression, and encryption combination when processing 28,021 components.
      </Paragraph>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Configuration</TableHead>
            <TableHead>Save Time (ms)</TableHead>
            <TableHead>Load Time (ms)</TableHead>
            <TableHead>Save GC (MB)</TableHead>
            <TableHead>Load GC (MB)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell><strong>JSON Serializer</strong></TableCell>
            <TableCell>2932.87</TableCell>
            <TableCell>1871.68</TableCell>
            <TableCell>4.06</TableCell>
            <TableCell>2.80</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>JSON + GZip</TableCell>
            <TableCell>3214.33</TableCell>
            <TableCell>1893.41</TableCell>
            <TableCell>4.06</TableCell>
            <TableCell>2.80</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>JSON + AES</TableCell>
            <TableCell>3106.83</TableCell>
            <TableCell>1944.30</TableCell>
            <TableCell>4.06</TableCell>
            <TableCell>2.80</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>JSON + GZip + AES</TableCell>
            <TableCell>3156.80</TableCell>
            <TableCell>1837.35</TableCell>
            <TableCell>4.06</TableCell>
            <TableCell>2.80</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>MSS Serializer</strong></TableCell>
            <TableCell>3095.36</TableCell>
            <TableCell>11014.81</TableCell>
            <TableCell>4.65</TableCell>
            <TableCell>8.11</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>MSS + GZip</TableCell>
            <TableCell>3160.07</TableCell>
            <TableCell>10860.29</TableCell>
            <TableCell>4.65</TableCell>
            <TableCell>8.11</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>MSS + AES</TableCell>
            <TableCell>3296.92</TableCell>
            <TableCell>11131.33</TableCell>
            <TableCell>4.65</TableCell>
            <TableCell>8.11</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>MSS + GZip + AES</TableCell>
            <TableCell>3194.67</TableCell>
            <TableCell>10907.50</TableCell>
            <TableCell>4.65</TableCell>
            <TableCell>8.11</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>XML Serializer</strong></TableCell>
            <TableCell>3049.19</TableCell>
            <TableCell>11391.31</TableCell>
            <TableCell>4.06</TableCell>
            <TableCell>9.80</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>XML + GZip</TableCell>
            <TableCell>3154.87</TableCell>
            <TableCell>11460.43</TableCell>
            <TableCell>4.06</TableCell>
            <TableCell>9.80</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>XML + AES</TableCell>
            <TableCell>3324.35</TableCell>
            <TableCell>11699.04</TableCell>
            <TableCell>4.06</TableCell>
            <TableCell>9.80</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>XML + GZip + AES</TableCell>
            <TableCell>3173.43</TableCell>
            <TableCell>11471.11</TableCell>
            <TableCell>4.06</TableCell>
            <TableCell>9.80</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Alert type="info" noMargin>
        <strong>Note:</strong> These benchmarks measure raw synchronous execution throughput. In production, MSS utilizes thread-safe asynchronous I/O to process these heavy serialization workloads in the background without blocking the main Unity thread.
      </Alert>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Stress Test (Sync)',
  section: 'overview',
  order: 0,
  Content: Content,
}