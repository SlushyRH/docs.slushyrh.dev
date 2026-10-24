import { Paragraph, Heading, Table, TableHeader, TableHead, TableBody, TableCell, TableRow, Link } from "@/components/ui";
import type { DocPageMeta, ProjectMeta } from "@/lib/types";
import { LuSquareCheckBig, LuTriangleAlert } from "react-icons/lu";

function Content({ project }: { project: ProjectMeta }) {
  return (
    <>
      <Heading>Unity Versions</Heading>
      <Paragraph>
        The Modular Save System is designed specifically for modern Unity environments. Below is the current compatibility status across different Unity versions.
      </Paragraph>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-65">Unity Version</TableHead>
            <TableHead>Support</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Unity 7 LTS</TableCell>
            <TableCell className="flex items-center gap-2 text-green-500">
              <LuSquareCheckBig size={20} />
              <span>Planned support</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Unity 6 LTS</TableCell>
            <TableCell className="flex items-center gap-2 text-green-500">
              <LuSquareCheckBig size={20} />
              <span>Fully supported</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Unity 2023 and earlier</TableCell>
            <TableCell className="flex items-center gap-2 text-yellow-500">
              <LuTriangleAlert size={20} />
              <span>Not supported</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Heading>Supported Platforms</Heading>
      <Paragraph>
        MSS aims to provide seamless cross-platform functionality. The table below outlines the current testing and support status across various build targets and scripting backends.
      </Paragraph>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-50">Platform</TableHead>
            <TableHead className="w-50">Mono</TableHead>
            <TableHead className="w-50">IL2CPP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Windows</TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-yellow-500">
                <LuTriangleAlert size={20} />
                <span>Planned</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-yellow-500">
                <LuTriangleAlert size={20} />
                <span>Planned</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>macOS</TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-yellow-500">
                <LuTriangleAlert size={20} />
                <span>Planned</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-yellow-500">
                <LuTriangleAlert size={20} />
                <span>Planned</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Linux</TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-yellow-500">
                <LuTriangleAlert size={20} />
                <span>Planned</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-yellow-500">
                <LuTriangleAlert size={20} />
                <span>Planned</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Android</TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-yellow-500">
                <LuTriangleAlert size={20} />
                <span>Planned</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-yellow-500">
                <LuTriangleAlert size={20} />
                <span>Planned</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>iOS</TableCell>
            <TableCell className="text-gray-400 italic">N/A</TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-yellow-500">
                <LuTriangleAlert size={20} />
                <span>Planned</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>WebGL</TableCell>
            <TableCell className="text-gray-400 italic">N/A</TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-yellow-500">
                <LuTriangleAlert size={20} />
                <span>Planned</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Xbox / PS5 / Switch</TableCell>
            <TableCell colSpan={2}>
              <div className="flex items-center gap-2 text-orange-500">
                <LuTriangleAlert size={20} />
                <span>
                  Requires custom integration, see below.
                </span>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Heading size='h2'>Console Support</Heading>
      <Paragraph>
        Due to strict NDAs and the requirement of official Developer Kits, this asset cannot be pre-tested on closed console ecosystems out of the box. Standard Unity file writing typically fails console certification, so we cannot guarantee plug-and-play functionality for Xbox, PS5, or Switch.
      </Paragraph>

      <Paragraph>
        However, MSS is architected specifically to support these platforms. By utilizing the <Link to={`/${project.id}/custom-providers/storage-provider`}>IStorageProvider</Link> and <Link to={`/${project.id}/custom-providers/file-stream-provider`}>IFileStreamProvider</Link> interfaces, registered console developers can bypass the standard PC file system entirely and route save data directly through proprietary console SDKs.
      </Paragraph>

      <Paragraph>
        If you are a registered developer under NDA and need architectural advice on implementing these interfaces for a specific console, please reach out via our <Link to={`/${project.id}/support`}>support channels</Link>. We are fully available to guide you through the integration process as much as we can.
      </Paragraph>
    </>
  )
}

export const page: DocPageMeta = {
  label: 'Compatibility',
  section: 'overview',
  order: 0,
  Content: Content,
}