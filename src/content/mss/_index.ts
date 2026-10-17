import type { ProjectMeta } from "@/lib/types";

const projectMeta: ProjectMeta = {
  slug: 'mss',
  title: 'Modular Save System',
  description: 'A flexible and modular save system for Unity.',
  logoUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/250px-Google_Favicon_2025.svg.png',
  redirectSlug: 'getting-started',
  sections: [
    { id: 'guides', label: 'Guides' },
    { id: 'api', label: 'API' },
  ],
  links: [
    { title: 'Github', url: 'https://github.com/SlushyRH/Modular-Save-System' }
  ]
}

export default projectMeta;