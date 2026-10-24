import { Paragraph, Heading, Link } from "@/components/ui";
import type { DocPageMeta } from "@/lib/types";

function Content() {
  return (
    <>
      <Heading>Support</Heading>
      <Paragraph>
        Need a hand with Modular Save System (MSS)? You can reach out through our available support channels below.
      </Paragraph>
      <Paragraph>
        <strong>Discord (Preferred):</strong> Join the <Link to="https://discord.gg/m2H5AEjpe2">MSS Community Discord</Link> for direct community assistance, troubleshooting, feature requests, and quick updates.
      </Paragraph>
      <Paragraph>
        <strong>Email Support:</strong> For direct developer inquiries, you can reach out via email at <Link to="mailto:help@slushyrh.dev">help (at) slushyrh.dev</Link>.
      </Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Support',
  order: 998,
  section: 'overview',
  Content: Content
}