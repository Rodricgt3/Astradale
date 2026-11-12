(() => {
  'use strict';

  for (const item of document.querySelectorAll('[data-astradale-faq]')) {
    const trigger = item.querySelector('[aria-controls]');
    const answer = item.querySelector('[data-astradale-faq-answer]');
    if (!trigger || !answer) continue;

    const toggle = () => {
      const expanded = trigger.getAttribute('aria-expanded') !== 'true';
      trigger.setAttribute('aria-expanded', String(expanded));
      answer.hidden = !expanded;
      if (expanded) answer.style.removeProperty('display');
      else answer.style.display = 'none';
    };

    trigger.addEventListener('click', toggle);
    trigger.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      toggle();
    });
  }

  const topButton = document.querySelector('button[aria-label="Volver al inicio"]');
  topButton?.addEventListener('click', () => {
    document.getElementById('hero')?.scrollIntoView({ block: 'start' });
  });

  const attachment = document.getElementById('project-attachment');
  const attachmentButton = document.querySelector('[aria-controls="project-attachment"]');
  if (attachment && attachmentButton) {
    attachmentButton.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      attachment.click();
    });
  }

  const contact = document.querySelector('[data-astradale-contact]');
  contact?.addEventListener('submit', event => event.preventDefault());
  contact?.querySelector('[aria-disabled="true"]')?.addEventListener('click', event => {
    event.preventDefault();
  });
})();
