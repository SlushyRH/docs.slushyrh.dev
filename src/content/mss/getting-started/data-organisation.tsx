import { Paragraph, Heading, CodeBlock } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

const codeExample = `using SRH.ModularSaveSystem;
using UnityEngine;

public static class Keys
{
    public const string PLAYER_POS = "player_pos";
    public const string PLAYER_OUTFIT = "player_outfit";
    
    public const string CAR_POS = "car_pos";
    public const string CAR_STATE = "car_state";

    public static readonly Group PLAYER_GROUP = new Group();
    public static readonly Group ENVIRONMENT_GROUP = new Group();
}

public class ExampleCode : MonoBehaviour
{
    [SerializeField] private SaveSystem saveSystem;
    
    public void ExampleMethod()
    {
        // add keys to a group
        Keys.PLAYER_GROUP.Add(Keys.PLAYER_POS);
        Keys.PLAYER_GROUP.Add(Keys.PLAYER_OUTFIT);
        
        Keys.ENVIRONMENT_GROUP.Add(Keys.CAR_POS);
        Keys.ENVIRONMENT_GROUP.Add(Keys.CAR_STATE);

        // pass group through methods
        saveSystem.DeleteGroup(Keys.PLAYER_GROUP);

        // loop through all keys in a group
        foreach (var key in Keys.PLAYER_GROUP)
            MSS.Exists(key);
    }
}`;

function Content() {
  return (
    <>
      <Heading>Organisation</Heading>
      <Paragraph>
        The best pratice to use for organisation is to make constant keys in a static class, and use groups.
        
      </Paragraph>

      <CodeBlock language="csharp" code={codeExample} allowCopy={false} />
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Data Organisation',
  section: 'guides',
  order: 5,
  Content: Content,
}