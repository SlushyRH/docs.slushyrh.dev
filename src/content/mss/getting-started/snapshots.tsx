import { Paragraph, Heading, CodeBlock } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

const exampleCode = `using SRH.ModularSaveSystem;
using UnityEngine;

public class ExampleCode : MonoBehaviour
{
    private FileSettings fileSettings;

    private void Start()
    {
        fileSettings.SubFolders = "example";
        fileSettings.FileName = "original";
        fileSettings.FileExtension = "txt";
        
        // creates version preserving filename as 'original'
        var fsSnapshot = fileSettings.CreateSnapshot();

        // change filename and extension
        fileSettings.FileName = "new";
        fileSettings.FileExtension = "json";
        Debug.Log(fileSettings.GetPath()); // outputs: '../example/new.json'
        
        // restore file settings back to original snapshot
        fileSettings.RestoreSnapshot(fsSnapshot);
        Debug.Log(fileSettings.GetPath()); // outputs: '../example/original.txt'
    }
}`;

function Content() {
  return (
    <>
      <Heading>Snapshots</Heading>
      <Paragraph>
        snapshots provide a way to create a version of an object, and restore the object to that version.
        for example, you have a file settings object, create a snapshot of it, modify the variables, and then restore to hte original version.
      </Paragraph>

      <CodeBlock language="csharp" code={exampleCode} allowCopy={false} />
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Snapshots',
  section: 'guides',
  order: 6,
  Content: Content,
} 