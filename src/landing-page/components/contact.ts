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

    if (!name || !email || !idea) {
      alert(`Please fill out all fields before sending.`);
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
          ContentType: 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name, email, message: idea }),
      });

      if (response.ok) {
        submitBtn.textContent = 'sent successfully!';
        submitBtn.style.backgroundColor = 'var(--color-green, #4caf50)';
        form.reset();

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.style.backgroundColor = '';
        }, 4000);
      } else {
        throw new Error('Server responded with an error status.');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      submitBtn.textContent = 'failed to send';
      submitBtn.style.backgroundColor = '#f44336';

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.backgroundColor = '';
      }, 4000);
    }
  });
}
