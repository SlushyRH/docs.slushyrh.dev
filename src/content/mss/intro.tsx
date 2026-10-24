import { Paragraph, Heading, Link } from "@/components/ui";
import type { DocPageMeta, ProjectMeta } from "@/lib/types";

function Content({ project }: { project: ProjectMeta }) {
  return (
    <>
      <Heading>Introduction</Heading>
      <Paragraph>
        Welcome to <strong>Modular Save System (MSS)</strong>, a robust, flexible, and developer-friendly data persistence solution built specifically for Unity. Designed to eliminate the boilerplate and fragility typically associated with game state saving, MSS provides a rock-solid foundation for projects of any scale—from rapid prototypes to production-ready commercial titles.
      </Paragraph>
      <Paragraph>
        Whether you need to serialize player stats, inventory inventories, complex scene hierarchies, or custom game states, MSS handles the heavy lifting behind the scenes while keeping your codebase clean, decoupled, and maintainable.
      </Paragraph>

      <Heading>Core Pillars</Heading>
      <Paragraph>
        At its heart, MSS is built upon three foundational pillars that guide its architecture, API design, and long-term roadmap: Modularity, Ease of Use, and a strict No-Breaks promise.
      </Paragraph>

      <Heading size='h2'>Modularity</Heading>
      <Paragraph>
        MSS is architected from the ground up for maximum extensibility. It is capable of serializing nearly any type in Unity out of the box, adapting seamlessly to your data structures. See a full list of <Link to={`/${project.id}/types`}>supported types here</Link>.
      </Paragraph>
      <Paragraph>
        Beyond data types, the entire serialization pipeline is modular. You can easily swap out serialization formats (such as JSON, XML, or the high-performance native MSS custom serialization), layer on security with AES encryption, reduce file footprints with GZip compression, or <Link to={`/${project.id}/custom-modules`}>implement your own custom serializers, compressors, and encryption providers </Link> with minimal friction using built in intefaces for simple plug-and-play.
      </Paragraph>

      <Heading size='h2'>Ease of Use</Heading>
      <Paragraph>
        Powerful systems shouldn't require reading a textbook to operate. MSS features a clean, intuitive API and straightforward setup designed to be immediately approachable for developers with a solid understanding of Unity and game engines, even with minimal advanced C# experience. 
      </Paragraph>
      <Paragraph>
        Getting your save and load logic up and running takes only a few lines of code, letting you focus on building your game rather than fighting with file streams and format exceptions.
      </Paragraph>

      <Heading size='h2'>No-Breaks Promise</Heading>
      <Paragraph>
        We understand that updating a core plugin mid-development can be nerve-wracking. The No-Breaks promise is our commitment to stability: we strive to ensure that existing methods, classes, and workflows will not break across routine updates. 
      </Paragraph>
      <Paragraph>
        In the rare event that architectural changes or deprecations are necessary, updates will be rolled out slowly with extensive advance warning, clear migration guides, and robust deprecation cycles so you can upgrade with complete peace of mind.
      </Paragraph>

      
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Introduction',
  order: -9999,
  section: 'overview',
  Content: Content
}