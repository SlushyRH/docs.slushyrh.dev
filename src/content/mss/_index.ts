import type { ProjectMeta } from "@/lib/types";
import { FaItchIo, FaUnity } from 'react-icons/fa';

const projectMeta: ProjectMeta = {
  title: 'Modular Save System',
  redirectSlug: 'overview',
  sections: [
    { id: 'overview', label: 'Overview' },
    { id: 'guides', label: 'Guides' },
    { id: 'modules', label: 'Modules' },
  ],
  links: [
    { title: 'Itch', icon: FaItchIo, url: 'https://slushyrh.itch.io/modular-save-system' },
    { title: 'Unity Asset Store', icon: FaUnity, url: 'https://assetstore.unity.com/packages/slug/278863' }
  ]
}

export default projectMeta;