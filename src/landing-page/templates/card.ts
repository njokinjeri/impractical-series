import {
  type Project,
  getPlayUrl,
  getPreviewUrl,
} from '../data/projects';

export function renderCard(project: Project): string {
  const playUrl = getPlayUrl(project.slug);
  const previewUrl = getPreviewUrl(project.slug);

  return `
    <article
      class="card"
      role="listitem"
      data-slug="${project.slug}"
      tabindex="0"
      aria-label="${project.title} - click to view details"
    >
      <div class="card__backing" aria-hidden="true"></div>
      <div class="card__front">

        <div class="card__thumb">
          <video
            class="card-thumb-video"
            src="${previewUrl}"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
            aria-hidden="true"
          ></video>
        </div>

        <div class="card__actions">
          <p class="card__title">${project.title}</p>
          <a
            class="card__live"
            href="${playUrl}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View live experiment: ${project.title}"
            title="View experiment"
          >
            View
          </a>
        </div>

      </div>
    </article>
  `.trim();
}