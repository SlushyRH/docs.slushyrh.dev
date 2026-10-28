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
  id?: string;
  logoUrl?: string;
  hiddden?: boolean;
  title: string;
  redirectSlug: string;
  sections?: DocSectionMeta[] | null;
  links?: Link[] | null;
}

export interface DocPageMeta {
  label: string;
  Content: React.FC<{project: ProjectMeta}>;
  order?: number;
  section?: string;
  description?: string;
  plainText?: string;
  hidden?: boolean;
}