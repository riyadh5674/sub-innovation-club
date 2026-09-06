// ============================================================
// CONTACT FORM — delivered via Formspree (same account as the
// membership form). Endpoint lives in club-data.js (clubData.forms)
// so it can be swapped without touching this file.
// ============================================================

import { clubData } from '../data/club-data.js';
import { showToast } from './toast.js';

export function initContact() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const fd = new FormData(form);
    fd.append('_subject', `SUBIC Website Message — ${fd.get('name') || 'Anonymous'}`);
    fd.append('_template', 'table');
    fd.append('_replyto', fd.get('email') || '');

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-1"></i>Sending...';

    try {
      const resp = await fetch(clubData.forms.contact, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });

      if (resp.ok) {
        showToast('Message sent — the club will get back to you soon.', 'success');
        form.reset();
      } else {
        throw new Error('request_failed');
      }
    } catch {
      showToast('Could not send your message. Email us at innovationclub@sub.ac.bd', 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane me-1"></i>Send Message';
    }
  });
}