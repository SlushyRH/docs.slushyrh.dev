import { Paragraph, Heading, Code } from "@/components/ui";
import { List } from "@/components/ui/list";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>File Settings</Heading>
      <Paragraph>
        The <Code>FileSettings</Code> ScriptableObject acts as the central configuration blueprint for file path construction, directory targeting, stream chunking, and file attributes within the Modular Save System (MSS). By isolating storage parameters into re-usable data assets, you can swap target directories, extensions, or chunk sizes across different save profiles without altering underlying code.
      </Paragraph>

      <Heading size="h2">Core Capabilities</Heading>
      <List type="unordered">
        <span><strong>Dynamic Path Resolution & Sanitization:</strong> Automatically handles cross-platform directory evaluation (such as <Code>PersistentDataPath</Code> or <Code>PlayerPrefs</Code>) while sanitizing slashes, extensions, and invalid file characters on runtime modifications.</span>
        <span><strong>Storage Provider Abstraction:</strong> Prioritizes custom implementations of <Code>IStorageProvider</Code> (falling back to default path enums when omitted), allowing custom cloud storage or isolated disk access providers to dynamically define save targets.</span>
        <span><strong>Zero-Allocation Snapshots:</strong> Implements <Code>ISnapshot</Code> with internal object pooling to record and roll back temporary runtime parameter changes without creating garbage collection pressure during heavy saving/loading operations.</span>
        <span><strong>Chunked I/O Buffer Management:</strong> Exposes explicit save and load chunk sizes (clamped to positive non-zero integers) to tune stream buffering performance for larger state allocations.</span>
      </List>

      <Heading size="h2">Default File Settings</Heading>
      <Paragraph>
        Configuring global defaults here dictates initial values when newly instantiated <Code>FileSettings</Code> assets are created or when calling <Code>Reset()</Code> on an existing instance at runtime. You can directly edit the values of the default file settings located at <Code>Tools/SRH/MSS/Default File Settings</Code>.
      </Paragraph>

      <Heading size="h2">Key Configurations</Heading>
      <List type="unordered">
        <span><strong>Base Directory:</strong> Selects between common platform directories like <Code>PersistentDataPath</Code>, <Code>DataPath</Code>, or key-value abstractions like <Code>PlayerPrefs</Code>.</span>
        <span><strong>Folder & File Structure:</strong> Configures target subfolders (e.g., <Code>Data/Saves</Code>), default file naming, and custom file extensions (e.g., <Code>txt</Code>, <Code>json</Code>).</span>
        <span><strong>File Attributes:</strong> Sets system flags such as <Code>Hidden</Code> or <Code>ReadOnly</Code> to secure local save files post-write.</span>
      </List>

      <Heading size="h2">Runtime Behavior & Equality</Heading>
      <Paragraph>
        Modifying properties like <Code>Directory</Code>, <Code>SubFolders</Code>, <Code>FileName</Code>, or <Code>FileExtension</Code> at runtime automatically invalidates the internal path cache, ensuring subsequent calls to retrieve paths immediately recompute the updated location.
      </Paragraph>
      <Paragraph>
        Calling <Code>Reset()</Code> reads from <Code>MssSettings.Global.DefaultFileSettings</Code> and reverts all instance fields back to the project-wide defaults set via the Project Settings editor.
      </Paragraph>
      <Paragraph>
        <Code>FileSettings</Code> implements value-based equality checking (via <Code>IEquatable&lt;FileSettings&gt;</Code>). Two distinct instances configured with matching storage providers, directories, subfolders, filenames, and extensions will evaluate as equal, making it straightforward to compare target locations before executing disk operations.
      </Paragraph>
    </>
  );
}

export const page: DocPageMeta = {
  label: 'File Settings',
  section: 'modules',
  order: 0,
  Content: Content,
};