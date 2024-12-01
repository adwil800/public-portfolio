
export interface Project {
  id: string;
  title?: string;
  subtitle?: string;
  summary?: string;
  date: string;
  tools: string[];
  image: string;
  imagePriority?: boolean;
  href?: string;
  demo?: boolean;
  ongoing?: boolean;
}
