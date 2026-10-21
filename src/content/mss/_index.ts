import type { ProjectMeta } from "@/lib/types";
import { FaGithub } from "react-icons/fa";

const projectMeta: ProjectMeta = {
  slug: 'mss',
  title: 'Documentation',
  redirectSlug: 'demo',
  links: [
    { title: 'Template', url: 'https://github.com/SlushyRH/snowcap-doc-template', icon: FaGithub }
  ]
}

export default projectMeta;