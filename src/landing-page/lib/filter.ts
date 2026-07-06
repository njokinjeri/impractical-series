import type { Project, StackTag } from '../data/projects';

export type SortOrder = 'asc' | 'desc';

export function filterByStack(
  projects: Project[],
  tag: StackTag | undefined
): Project[] {
  if (!tag) return projects;
  return projects.filter((p) => p.stack.includes(tag));
}

export function sortByIndex(
  projects: Project[],
  order: SortOrder = 'asc'
): Project[] {
  return [...projects].sort((a, b) =>
    order === 'asc' ? a.index - b.index : b.index - a.index
  );
}
