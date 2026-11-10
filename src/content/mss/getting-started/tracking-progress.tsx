import { Paragraph, Heading, CodeBlock, Link } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

const exampleCode = `using SRH.ModularSaveSystem;
using UnityEngine;

public class ExampleCode : MonoBehaviour
{
    [SerializeField] private SaveSystem saveSystem;

    private MssContext saveContext;

    private void Update()
    {
        // outputs the save progress when saving in form of 0 - 100%
        if (saveSystem.Mode == StatusMode.Saving)
            Debug.Log($"Save Progress: {saveContext.Progress * 100}%");
    }

    public async Awaitable SaveAsync()
    {
        // pass MssContext through async methods to allow for 
        await saveSystem.SaveAsync(saveContext);
        
        // MssContext also allows you to cancel an action if needed
        saveSystem.Cancel(saveContext);
    }
}`;

function Content() {
  return (
    <>
      <Heading>Context Tracking</Heading>
      <Paragraph>
        You can use <Link to="https://api.slushyrh.dev/mss/SRH.ModularSaveSystem.MssContext">MSS Context</Link> to track the progress of an async method, and even cancel it when needed.
      </Paragraph>

      <CodeBlock language="csharp" code={exampleCode} />
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Tracking Progress',
  section: 'guides',
  order: 7,
  Content: Content,
}