import { mountFooter } from './footer-mount';

try {
  mountFooter(15);
} catch (error) {
  console.error('Footer mount failure bypassed safely:', error);
}

const contactForm = document.getElementById(
  'contact-form'
) as HTMLFormElement | null;

if (contactForm) {
  let statusMessage = document.getElementById(
    'contact-status'
  ) as HTMLDivElement | null;
  if (!statusMessage) {
    statusMessage = document.createElement('div');
    statusMessage.id = 'contact-status';
    statusMessage.className = 'form-status';
    contactForm.appendChild(statusMessage);
  }

  contactForm.addEventListener('submit', async (e: Event) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const submitBtn = form.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    const originalText = submitBtn.textContent || 'send';

    const nameEL = document.getElementById('contact-name') as HTMLInputElement;
    const emailEL = document.getElementById(
      'contact-email'
    ) as HTMLInputElement;
    const ideaEL = document.getElementById(
      'contact-idea'
    ) as HTMLTextAreaElement;

    const name = nameEL.value.trim();
    const email = emailEL.value.trim();
    const idea = ideaEL.value.trim();

    statusMessage!.textContent = '';
    statusMessage!.className = 'form-status';

    if (!name || !email || !idea) {
      statusMessage!.textContent = 'please fill out all fields before sending.';
      statusMessage!.classList.add('form-status--error');
      return;
    }

    submitBtn.textContent = 'sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';

    try {
      const FORM_ENDPOINT = 'https://formspree.io/f/mqevwodo';

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name, email, message: idea }),
      });

      if (response.ok) {
        statusMessage!.textContent = 'message sent successfully.';
        statusMessage!.classList.add('form-status--success');

        submitBtn.textContent = 'sent';
        form.reset();

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          statusMessage!.textContent = '';
          statusMessage!.className = 'form-status';
        }, 4000);
      } else {
        throw new Error('Server responded with an error status.');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      statusMessage!.textContent = 'failed to send message. please try again.';
      statusMessage!.classList.add('form-status--error');

      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }
  });
}
