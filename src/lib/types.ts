import type { IconType } from "react-icons";

export interface Link {
  title: string;
  url: string;
  icon?: IconType | null;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  redirectSlug: string;
  links?: Link[] | null;
}

export interface DocPageMeta {
  slug: string;
  label: string;
  Content: React.FC;
  order?: number;
}