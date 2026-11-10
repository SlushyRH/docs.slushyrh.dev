import { Paragraph, Heading, Code, CodeBlock } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

const saveLoadCode = `using SRH.ModularSaveSystem;
using UnityEngine;

public class ExampleCode : MonoBehaviour
{
    private const string CC_KEY = "clickCount";
    
    // reference to save system in the scene
    [SerializeField] private SaveSystem saveSystem;

    private int clickCount = 0;

    private void Update()
    {
        // increment click count on space click
        if (Input.GetKeyDown(KeyCode.Space))
            clickCount++;
    }

    // call this method to save data to disk
    public void SaveData()
    {
        saveSystem.Set<int>(CC_KEY, clickCount);
        saveSystem.Save();
    }

    // call this method to load data from disk
    public void LoadData()
    {
        saveSystem.Load();
        clickCount = saveSystem.Get<int>(CC_KEY);
    }
    
    // ASYNC OVERLOAD VERSIONS
    public async Awaitable SaveDataAsync()
    {
        await saveSystem.SetAsync<int>(CC_KEY, clickCount);
        await saveSystem.SaveAsync();
    }

    public async Awaitable LoadDataAsync()
    {
        await saveSystem.LoadAsync();
        clickCount = await saveSystem.GetAsync<int>(CC_KEY);
    }
}`;

function Content() {
  return (
    <>
      <Heading>Saving/Loading Data</Heading>
      <Paragraph>
        Saving and loading data is extremly simple and straightforward. You first grab a reference to the Save System in the scene, then just
        just call <Code>{`saveSystem.Set<int>("key", value);`}</Code> to save data to the Save System, and <Code>{`saveSystem.Get<int>("key");`}</Code> to
        load the data. there are also async overloads for both these methods.
      </Paragraph>

      <CodeBlock language="csharp" code={saveLoadCode} allowCopy={false} />
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Saving & Loading',
  section: 'guides',
  order: 2,
  Content: Content,
}