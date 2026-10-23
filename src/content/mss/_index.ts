import type { ProjectMeta } from "@/lib/types";
import { FaItchIo, FaUnity } from "react-icons/fa";

const projectMeta: ProjectMeta = {
  slug: 'mss',
  title: 'Documentation',
  redirectSlug: 'demo',
  links: [
    { title: 'Asset Store', url: 'https://github.com/SlushyRH/', icon: FaUnity },
    { title: 'Itch', url: 'https://github.com/SlushyRH/', icon: FaItchIo }
  ]
}

export default projectMeta;