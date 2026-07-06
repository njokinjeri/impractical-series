import type { Project } from '../data/projects';

export interface PaginationResult {
  items: Project[];
  page: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export function paginate(
  projects: Project[],
  page: number,
  perPage = 6
): PaginationResult {
  const totalPages = Math.max(1, Math.ceil(projects.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  const items = projects.slice(start, start + perPage);

  return {
    items,
    page: safePage,
    totalPages,
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages,
  };
}
