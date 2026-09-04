// ============================================================
// DARK MODE TOGGLE
// ============================================================

const STORAGE_KEY = 'subic_theme';

export function initDarkMode() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldDark = saved === 'dark' || (!saved && prefersDark);

  if (shouldDark) {
    document.body.classList.add('dark-mode');
  }

  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    updateToggleIcon(toggle, shouldDark);
    toggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
      updateToggleIcon(toggle, isDark);
    });
  }
}

function updateToggleIcon(btn, isDark) {
  const sun = btn.querySelector('.icon-sun');
  const moon = btn.querySelector('.icon-moon');
  if (sun && moon) {
    sun.style.display = isDark ? 'inline' : 'none';
    moon.style.display = isDark ? 'none' : 'inline';
  }
}
