import { Paragraph, Heading, Code } from "@/components/ui";
import { List } from "@/components/ui/list";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>MSS Settings</Heading>
      <Paragraph>
        The <Code>MssSettingsAsset</Code> is a <Code>ScriptableObject</Code> that wraps the core configuration object (<Code>MssSettings</Code>) for the Modular Save System (MSS). It holds all default configuration parameters, from I/O file sharing and metadata extension rules to serialization boundaries, backup policies, and manager reference registration.
      </Paragraph>
      <Paragraph>
        You can access global settings via static references like <Code>MssSettingsAsset.Global</Code> or <Code>MssSettings.Global</Code> which fall back to the runtime global default instance.
      </Paragraph>

      <Heading size="h2">Creation & Usage</Heading>
      <Paragraph>
        While it's recommend to edit the global settings through <Code>Tools/SRH/MSS/Settings</Code>, you can create a new instance via the Unity Create Asset context menu (<Code>Create &gt; Modular Save System &gt; ...</Code>) or programmatically through <Code>MssSettingsAsset.Create()</Code>.
      </Paragraph>

      <Heading size="h2">Configuration Categories</Heading>
      <List type="unordered">
        <span><strong>File & Storage Rules:</strong> Configures metadata file options (<Code>MetaFileExtension</Code>, <Code>HideMetaFiles</Code>), atomic file operations, file-share access locks (<Code>WriteFileShare</Code>, <Code>ReadFileShare</Code>), max file size thresholds, and automatic backups.</span>
        <span><strong>Serialization & Performance:</strong> Controls object serialization depth limits, reference tracking, handling of null/default values, stream writer buffer sizes, and startup converter warmup options.</span>
        <span><strong>Manager & Resource Discovery:</strong> Toggles automatic discovery and referencing of custom serializers, compression providers, and encryption modules.</span>
        <span><strong>Lifecycle & Safety:</strong> Manages safety behaviors such as <Code>PreventQuitIfSaving</Code>, cache persistence on disk, and runtime progress tracking depth.</span>
      </List>

      <Heading size="h2">Runtime Snapshots & State Management</Heading>
      <Paragraph>
        <Code>MssSettings</Code> implements <Code>ISnapshot</Code> with an internal object pool (<Code>snapshotPool</Code>). This allows runtime systems to capture temporary state configurations via <Code>CreateSnapshot()</Code> and restore or release them later without causing garbage collection allocations.
      </Paragraph>
    </>
  );
}

export const page: DocPageMeta = {
  label: 'MSS Settings',
  section: 'modules',
  order: 1,
  Content: Content,
};