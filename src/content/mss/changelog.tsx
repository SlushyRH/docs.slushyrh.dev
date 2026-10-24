import { Paragraph, Heading, Expandable } from "@/components/ui";
import { List } from "@/components/ui/list";
import type { DocPageMeta } from "@/lib/types";
import { useState } from "react";

const CHANGELOG_DATA = [
  {
    version: "v1.1.0",
    updates: [
      "Added expandable changelog entries using the custom Expandable component.",
      "Optimized documentation loading speeds."
    ]
  },
  {
    version: "v1.0.5",
    updates: [
      "Fixed an issue with the navigation menu overlapping on mobile devices."
    ]
  },
  {
    version: "v1.0.0",
    updates: [
      "Initial public release."
    ]
  }
];

function Content() {
  const [openVersion, setOpenVersion] = useState<string | null>(CHANGELOG_DATA[0]?.version);

  return (
    <>
      <Heading>Changelog</Heading>
      <Paragraph>Keep track of the latest updates and improvements.</Paragraph>
        
      {CHANGELOG_DATA.map((release) => (
          <Expandable 
            key={release.version} 
            title={release.version} 
            data-sidebar-title={release.version}
            isOpen={openVersion === release.version}
            onToggle={() => {
              setOpenVersion(openVersion === release.version ? null : release.version);
            }}
          >
            <List type="unordered">
              {release.updates.map((update, i) => (
                <span key={i}>{update}</span>
              ))}
            </List>
          </Expandable>
        ))}
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Changelog',
  section: 'overview',
  order: 999,
  Content: Content,
}