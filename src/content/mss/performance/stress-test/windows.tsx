import { Paragraph, Heading, Table, TableHeader, TableHead, TableBody, TableCell, TableRow, Alert } from "@/components/ui";
import { List } from "@/components/ui/list";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Stress Test (Windows)</Heading>

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

      <Paragraph>
        The tables below detail the performance impact of every included serialization, compression, and encryption combination when processing 10,000 components.
      </Paragraph>

      <Heading size="h2">Performance Results (Mono)</Heading>
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
            <TableCell><strong>JSON Serializer</strong></TableCell>
            <TableCell>1167.82</TableCell>
            <TableCell>710.00</TableCell>
            <TableCell>1521.93</TableCell>
            <TableCell>1027.05</TableCell>
            <TableCell>2021.38</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>JSON + GZip</TableCell>
            <TableCell>1272.24</TableCell>
            <TableCell>686.77</TableCell>
            <TableCell>1521.95</TableCell>
            <TableCell>1027.04</TableCell>
            <TableCell>345.52</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>JSON + AES</TableCell>
            <TableCell>1202.26</TableCell>
            <TableCell>729.20</TableCell>
            <TableCell>1521.98</TableCell>
            <TableCell>1027.13</TableCell>
            <TableCell>2021.41</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>JSON + GZip + AES</TableCell>
            <TableCell>1214.72</TableCell>
            <TableCell>690.95</TableCell>
            <TableCell>1521.99</TableCell>
            <TableCell>1027.10</TableCell>
            <TableCell>345.27</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>MSS Serializer</strong></TableCell>
            <TableCell>1132.52</TableCell>
            <TableCell>673.12</TableCell>
            <TableCell>1522.30</TableCell>
            <TableCell>1015.46</TableCell>
            <TableCell>1587.78</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>MSS + GZip</TableCell>
            <TableCell>1264.55</TableCell>
            <TableCell>670.45</TableCell>
            <TableCell>1522.32</TableCell>
            <TableCell>1015.46</TableCell>
            <TableCell>335.90</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>MSS + AES</TableCell>
            <TableCell>1221.58</TableCell>
            <TableCell>698.43</TableCell>
            <TableCell>1522.35</TableCell>
            <TableCell>1015.53</TableCell>
            <TableCell>1587.81</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>MSS + GZip + AES</TableCell>
            <TableCell>1193.12</TableCell>
            <TableCell>673.86</TableCell>
            <TableCell>1522.37</TableCell>
            <TableCell>1015.50</TableCell>
            <TableCell>335.69</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>XML Serializer</strong></TableCell>
            <TableCell>1181.43</TableCell>
            <TableCell>1279.97</TableCell>
            <TableCell>1521.94</TableCell>
            <TableCell>1549.80</TableCell>
            <TableCell>3095.65</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>XML + GZip</TableCell>
            <TableCell>1281.60</TableCell>
            <TableCell>1383.47</TableCell>
            <TableCell>1521.96</TableCell>
            <TableCell>1549.81</TableCell>
            <TableCell>367.94</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>XML + AES</TableCell>
            <TableCell>1244.31</TableCell>
            <TableCell>1338.62</TableCell>
            <TableCell>1521.99</TableCell>
            <TableCell>1549.88</TableCell>
            <TableCell>3095.67</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>XML + GZip + AES</TableCell>
            <TableCell>1252.34</TableCell>
            <TableCell>1331.05</TableCell>
            <TableCell>1522.00</TableCell>
            <TableCell>1549.88</TableCell>
            <TableCell>367.97</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Heading size="h2">Performance Results (IL2CPP)</Heading>
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
            <TableCell><strong>JSON Serializer</strong></TableCell>
            <TableCell>3352.99</TableCell>
            <TableCell>777.00</TableCell>
            <TableCell>1820.00</TableCell>
            <TableCell>1260.00</TableCell>
            <TableCell>2017.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>JSON + GZip</TableCell>
            <TableCell>3300.11</TableCell>
            <TableCell>730.50</TableCell>
            <TableCell>1820.00</TableCell>
            <TableCell>1260.00</TableCell>
            <TableCell>348.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>JSON + AES</TableCell>
            <TableCell>3300.66</TableCell>
            <TableCell>768.40</TableCell>
            <TableCell>1820.00</TableCell>
            <TableCell>1260.00</TableCell>
            <TableCell>2017.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>JSON + GZip + AES</TableCell>
            <TableCell>3287.10</TableCell>
            <TableCell>729.20</TableCell>
            <TableCell>1820.00</TableCell>
            <TableCell>1260.00</TableCell>
            <TableCell>348.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>MSS Serializer</strong></TableCell>
            <TableCell>3224.02</TableCell>
            <TableCell>684.56</TableCell>
            <TableCell>1820.00</TableCell>
            <TableCell>1250.00</TableCell>
            <TableCell>1587.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>MSS + GZip</TableCell>
            <TableCell>3299.41</TableCell>
            <TableCell>671.02</TableCell>
            <TableCell>1820.00</TableCell>
            <TableCell>1250.00</TableCell>
            <TableCell>338.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>MSS + AES</TableCell>
            <TableCell>3332.34</TableCell>
            <TableCell>692.15</TableCell>
            <TableCell>1820.00</TableCell>
            <TableCell>1250.00</TableCell>
            <TableCell>1587.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>MSS + GZip + AES</TableCell>
            <TableCell>3290.42</TableCell>
            <TableCell>667.11</TableCell>
            <TableCell>1820.00</TableCell>
            <TableCell>1250.00</TableCell>
            <TableCell>338.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>XML Serializer</strong></TableCell>
            <TableCell>3334.52</TableCell>
            <TableCell>935.65</TableCell>
            <TableCell>1820.00</TableCell>
            <TableCell>1720.00</TableCell>
            <TableCell>3092.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>XML + GZip</TableCell>
            <TableCell>3386.16</TableCell>
            <TableCell>979.41</TableCell>
            <TableCell>1820.00</TableCell>
            <TableCell>1720.00</TableCell>
            <TableCell>369.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>XML + AES</TableCell>
            <TableCell>3376.09</TableCell>
            <TableCell>996.34</TableCell>
            <TableCell>1820.00</TableCell>
            <TableCell>1720.00</TableCell>
            <TableCell>3092.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>XML + GZip + AES</TableCell>
            <TableCell>3653.29</TableCell>
            <TableCell>942.90</TableCell>
            <TableCell>1820.00</TableCell>
            <TableCell>1720.00</TableCell>
            <TableCell>369.00</TableCell>
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
  label: 'Windows',
  section: 'overview',
  order: 0,
  Content: Content,
}