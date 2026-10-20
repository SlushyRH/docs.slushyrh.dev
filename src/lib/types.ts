import type { IconType } from "react-icons";

export interface ComponentProps {
  noMargin?: boolean;
  className?: string;
}

export interface Link {
  title: string;
  url: string;
  icon?: IconType | null;
}

export interface DocSectionMeta {
  id: string;
  label: string;
}

export interface ProjectMeta {
  slug: string;
  logoUrl?: string;
  title: string;
  redirectSlug: string;
  sections?: DocSectionMeta[] | null;
  links?: Link[] | null;
}

export interface DocFolderMeta {
  slug: string;
  label: string;
  collapsable: boolean;
  redirectSlug: string;
  order?: number;
  section?: string;
}

export interface DocPageMeta {
  slug: string;
  label: string;
  Content: React.FC<{project: ProjectMeta}>
  order?: number;
  section?: string;
  description?: string;
  plainText?: string;
}