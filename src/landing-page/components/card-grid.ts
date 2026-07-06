import { projects, ACCENT_HEX, type Project } from '../data/projects';
import { renderCard, drawCardThumb } from '../templates/card';
import { paginate } from '../lib/paginate';

const PER_PAGE = 6;

let currentPage = 1;
let activeFilter = 'all';

const FILTERS: Record<string, string[]> = {
  all: [],
  canvas: ['Canvas 2D', 'Canvas API'],
  three: ['Three.js', 'GLSL', 'Simplex Noise'],
  css: ['CSS', 'CSS 3D', 'HTML'],
};

function getElements() {
  return {
    grid: document.getElementById('card-grid') as HTMLElement,
    prevBtn: document.getElementById('page-prev') as HTMLButtonElement,
    nextBtn: document.getElementById('page-next') as HTMLButtonElement,
    indicator: document.getElementById('page-indicator') as HTMLElement,
  };
}

function filterProjects(): Project[] {
  if (activeFilter === 'all') return projects;
  const tags = FILTERS[activeFilter];
  return projects.filter((p) => p.stack.some((tag) => tags.includes(tag)));
}

function wireCards(): void {
  document.querySelectorAll<HTMLElement>('.card').forEach((card) => {
    const slug = card.dataset.slug!;
    const project = projects.find((p) => p.slug === slug);

    if (project) {
      card.style.setProperty('--card-accent', ACCENT_HEX[project.accent]);
    }

    card.addEventListener('click', () => {
      window.location.href = `/impractical-series/project.html#${slug}`;
    });

    card.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.location.href = `/impractical-series/project.html#${slug}`;
      }
    });

    card
      .querySelectorAll<HTMLAnchorElement>('.card__source, .card__live')
      .forEach((link) => {
        link.addEventListener('click', (e) => e.stopPropagation());
      });
  });
}

function render(page: number): void {
  const { grid, prevBtn, nextBtn, indicator } = getElements();
  const filtered = filterProjects();
  const result = paginate(filtered, page, PER_PAGE);

  grid.innerHTML = result.items.map(renderCard).join('');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document
        .querySelectorAll<HTMLCanvasElement>('.card-thumb-canvas')
        .forEach((canvas) => {
          const project = projects.find((p) => p.slug === canvas.dataset.slug);
          if (!project) return;

          drawCardThumb(canvas, project);

          const observer = new ResizeObserver(() =>
            drawCardThumb(canvas, project)
          );
          observer.observe(canvas.parentElement!);
        });
      wireCards();
    });
  });

  prevBtn.disabled = !result.hasPrev;
  nextBtn.disabled = !result.hasNext;
  indicator.textContent = `${result.page} of ${result.totalPages}`;
  currentPage = result.page;
}

function mountFilters(): void {
  const filterRow = document.getElementById('filter-row');
  if (!filterRow) return;

  filterRow
    .querySelectorAll<HTMLButtonElement>('[data-filter]')
    .forEach((btn) => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter!;
        currentPage = 1;

        filterRow
          .querySelectorAll('[data-filter]')
          .forEach((b) => b.classList.remove('filter-pill--active'));
        btn.classList.add('filter-pill--active');

        render(1);
      });
    });
}

export function mountCardGrid(): void {
  const { prevBtn, nextBtn } = getElements();

  prevBtn.addEventListener('click', () => render(currentPage - 1));
  nextBtn.addEventListener('click', () => render(currentPage + 1));

  mountFilters();
  render(1);
}
