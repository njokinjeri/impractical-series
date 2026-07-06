import {
  projects,
  ACCENT_HEX,
  getPlayUrl,
  getSourceUrl,
  type Project,
} from './data/projects';
import { mountFooter } from './components/footer-mount';
import { renderCardPreview } from './templates/card-preview';

function getSlugFromHash(): string {
  return window.location.hash.replace('#', '');
}

function redirectHome(): void {
  window.location.href = '/impractical-series/';
}

function renderProject(project: Project): void {
  const index = String(project.index).padStart(2, '0');
  const playUrl = getPlayUrl(project.slug);
  const sourceUrl = getSourceUrl(project.slug);
  const accent = ACCENT_HEX[project.accent];

  const stackPills = project.stack
    .map((tag) => `<span class="stack-pill" role="listitem">${tag}</span>`)
    .join('');

  const main = document.getElementById('project-main')!;

  main.innerHTML = `
    <section class="detail-grid" aria-label="${project.title} details">

      <div class="detail-card">
      <div
          class="detail-card__backing card__backing--${project.accent}"
          style="--accent:${accent};"
          aria-hidden="true"
      ></div>

        <div class="detail-card__front">
          <canvas id="detail-preview" aria-label="${project.title} generative preview"></canvas>
        </div>
      </div>

      <div class="detail-meta">
        <p class="detail-index" aria-label="Experiment number">${index}</p>
        <h1 class="page-title">${project.title}</h1>
        <p class="page-desc">${project.description}</p>

        <p class="stack-label">stack</p>
        <div class="stack-pills" role="list" aria-label="Technologies used">
          ${stackPills}
        </div>

        <div class="detail-actions">
          <a
            class="btn btn--primary"
            href="${playUrl}"
            target="_blank"
            rel="noopener noreferrer"
          >Live</a>
          <a
            class="btn btn--ghost"
            href="${sourceUrl}"
            target="_blank"
            rel="noopener noreferrer"
          >Source</a>
        </div>
      </div>

    </section>
  `;

  document.title = `${project.title} — Impractical Series`;

  requestAnimationFrame(() => {
    const previewCanvas = document.getElementById(
      'detail-preview'
    ) as HTMLCanvasElement | null;
    if (!previewCanvas) return;

    renderCardPreview(previewCanvas, project);

    const observer = new ResizeObserver(() =>
      renderCardPreview(previewCanvas, project)
    );
    observer.observe(previewCanvas.parentElement!);
  });
}

function init(): void {
  const slug = getSlugFromHash();
  const project = projects.find((p) => p.slug === slug);

  if (!slug || !project) {
    redirectHome();
    return;
  }

  renderProject(project);
  mountFooter(15);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
