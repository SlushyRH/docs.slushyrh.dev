import { Paragraph, Heading, Stepper, Step, Link, Code, Image, Grid } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Setup</Heading>
      <Stepper>
        <Step>
          <Paragraph>
            The core of MSS is built around <Link to="/mss/scriptable-objects/file-settings">FileSettings</Link> scriptable objects, these are used to point
            towards a specific file. Creating FileSettings are simple, just right click the Assets and <Code>Create/SRH/MSS/New File Settings</Code>. After creating,
            the FileSettings, just tweak the values in the inspector to point to the correct file location. (use debug foldout to see how the path is on your local machine).
          </Paragraph>
          <Grid>
            <Image src="/mss/getting-started/setup/file-settings-create.png" />
            <Image src="/mss/getting-started/setup/file-settings-inspector.png" />
          </Grid>
        </Step>

        <Step>
          <Paragraph>
            Add a new gameobject to the scene and add the  <Link to="/mss/components/save-system">SaveSystem</Link> component and add your file settings and a
            serilaizer of your choice (<Code>Add Component/SRH/MSS/Modules/JSON Serializer</Code>). The save system is the core component you need to save, you add data to this save system, and then
            when you save the data, it will save all data in that save system to the file settings attached to that save system, and vice versa when loading.
            You can of course overrite the file settings per save so you can just use 1 save system for multiple files instead of multiple save systems.
          </Paragraph>

          <Image src="/mss/getting-started/setup/save-system-inspector.png" />
        </Step>
        
        <Step>
          <Grid>
            <span>
              <Paragraph>
                You can optionally add a <Link to="/mss/components/mss-ref-manager">MSS Reference Manager</Link>, which enables the save system to use in-scene object references.
                It's recommened to add this however it is not required too.
              </Paragraph>
              <Paragraph>
                By default, MssReferenceManager isn't used as a scraper so it only detects objects that have the 
                <Link to="/mss/components/ref-entity">MSS Reference Entity</Link> component which helps save resources, but you can toggle <Code>Use As Scraper</Code>
                to bypass this and have it auto-reference ALL components in the scene.
              </Paragraph>
            </span>
            <Image src="/mss/getting-started/setup/mss-ref-manager-item.png" />
          </Grid>

          <Image src="/mss/getting-started/setup/mss-ref-manager.png" />
        </Step>
      </Stepper>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Setup',
  section: 'guides',
  order: 0,
  Content: Content,
}