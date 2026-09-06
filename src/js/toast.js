// ============================================================
// TOAST NOTIFICATIONS
// Small non-blocking feedback used instead of native alert().
// ============================================================

const ICONS = {
  success: 'fa-circle-check',
  error: 'fa-circle-exclamation',
  info: 'fa-circle-info',
};

export function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'false');
    document.body.appendChild(container);
  }

  const el = document.createElement('div');
  el.className = `toast-card ${type}`;
  el.setAttribute('role', 'status');
  el.innerHTML = `<i class="fa-solid ${ICONS[type] || ICONS.info}"></i><span>${message}</span><button class="toast-dismiss" aria-label="Dismiss">&times;</button>`;

  const dismiss = () => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 300);
  };

  el.querySelector('.toast-dismiss').addEventListener('click', dismiss);
  container.appendChild(el);

  setTimeout(dismiss, 5000);
}