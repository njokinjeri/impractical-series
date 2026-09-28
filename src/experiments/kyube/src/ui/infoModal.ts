export interface InfoModalElements {
  modal: HTMLElement;
  openBtn: HTMLElement;
  closeBtn: HTMLElement;
}

export function getInfoModalElements(): InfoModalElements {
  return {
    modal: document.getElementById('info-modal')!,
    openBtn: document.getElementById('btn-top-info')!,
    closeBtn: document.getElementById('btn-close-modal')!
  };
}

export function initInfoModal(el: InfoModalElements): void {
  el.openBtn.addEventListener('click', () => {
    el.modal.classList.add('active');
  });

  el.closeBtn.addEventListener('click', () => {
    el.modal.classList.remove('active');
  });

  el.modal.addEventListener('click', (e) => {
    if (e.target === el.modal) el.modal.classList.remove('active');
  });
}

export function isModalActive(el: InfoModalElements): boolean {
  return el.modal.classList.contains('active');
}