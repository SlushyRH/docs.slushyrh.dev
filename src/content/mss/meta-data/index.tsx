import { Paragraph, Heading, CodeBlock } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

const exampleCode = `using System;
using SRH.ModularSaveSystem;
using UnityEngine;

public class ExampleMetaData : IMetaData
{
    public DateTime SaveCreateTime;
    public DateTime LastUpdateTime;
    public float CompletionPercentage;

    public ExampleMetaData()
    {
        // init initial data when metadata is created
        SaveCreateTime = DateTime.UtcNow;
        CompletionPercentage = 0;
    }
    
    public void Init(IMetaData metaData)
    {
        // ignore any other metadata types
        if (metaData is not ExampleMetaData exampleMetaData)
            return;
        
        SaveCreateTime = exampleMetaData.SaveCreateTime;
        LastUpdateTime = exampleMetaData.LastUpdateTime;
        CompletionPercentage = exampleMetaData.CompletionPercentage;
    }
    
    public IMetaData Clone()
    {
        return new ExampleMetaData()
        {
            SaveCreateTime = SaveCreateTime,
            LastUpdateTime = LastUpdateTime,
            CompletionPercentage = CompletionPercentage
        };
    }
    
    // this is called right after data is loaded
    public void Load() { }
    
    // this is called right before data is saved
    public void Save()
    {
        // we will update the last update time every time we save
        LastUpdateTime = DateTime.UtcNow;
    }
}

public class ExampleCode : MonoBehaviour
{
    [SerializeField] private SaveSystem saveSystem;
    private ExampleMetaData metaData;

    public void Save()
    {
        if (metaData == null)
            metaData = new ExampleMetaData();

        // save data with meta data attached
        saveSystem.Save(metaData);
    }
}`;

function Content() {
  return (
    <>
      <Heading>Title</Heading>
      <Paragraph>write about meta data shit</Paragraph>

      <CodeBlock language="csharp" code={exampleCode} />
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Meta Data',
  section: 'guides',
  order: 0,
  Content: Content,
}