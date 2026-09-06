// ============================================================
// DARK MODE — applied on load, both toggles always in sync
// ============================================================

const STORAGE_KEY = 'subic_theme';
const TOGGLE_IDS = ['themeToggle', 'themeToggleMobile'];

export function initDarkMode() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldDark = saved === 'dark' || (!saved && prefersDark);

  if (shouldDark) document.body.classList.add('dark-mode');
  syncToggleIcons(shouldDark);

  TOGGLE_IDS.forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
      syncToggleIcons(isDark);
    });
  });
}

function syncToggleIcons(isDark) {
  TOGGLE_IDS.forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.querySelectorAll('.icon-sun').forEach((icon) => {
      icon.style.display = isDark ? 'inline' : 'none';
    });
    btn.querySelectorAll('.icon-moon').forEach((icon) => {
      icon.style.display = isDark ? 'none' : 'inline';
    });
  });
}