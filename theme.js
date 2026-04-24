/* ═══════════════════════════════════════════
   EasyEnglish Theme System
   8 themes · localStorage · auto-apply
   ═══════════════════════════════════════════ */

const THEMES = {
  aura: {
    name: 'Aura', icon: 'leaf', type: 'dark',
    colors: ['#1a3338','#64d8a5','#a78bfa','#f0c27a'],
    vars: {
      '--bg':'#0b1a1e','--bg2':'#12282e','--bg3':'#1a3338',
      '--accent':'#64d8a5','--accent2':'#a78bfa','--accent3':'#f0c27a',
      '--coral':'#ff8a80','--green':'#6bcb77','--pink':'#dba4c7',
      '--text':'#f5faf7','--text2':'#c2d9ce','--text3':'#84a99a',
      '--border':'rgba(100,216,165,0.08)','--card':'#12282e','--card2':'#1a3338',
      '--nav-bg':'rgba(11,26,30,0.92)','--drop-bg':'rgba(13,30,36,0.98)',
      '--orb1':'rgba(100,216,165,0.12)','--orb2':'rgba(167,139,250,0.08)',
      '--logo-text':'#0b1a1e'
    }
  },
  midnight: {
    name: 'Midnight', icon: 'moon', type: 'dark',
    colors: ['#1e2140','#6c8cff','#a78bfa','#ff8a80'],
    vars: {
      '--bg':'#0e1225','--bg2':'#161b35','--bg3':'#1e2140',
      '--accent':'#6c8cff','--accent2':'#a78bfa','--accent3':'#ffb86c',
      '--coral':'#ff8a80','--green':'#6bcb77','--pink':'#e879a0',
      '--text':'#f0f2ff','--text2':'#b0b8d9','--text3':'#7580a8',
      '--border':'rgba(108,140,255,0.08)','--card':'#161b35','--card2':'#1e2140',
      '--nav-bg':'rgba(14,18,37,0.92)','--drop-bg':'rgba(16,20,42,0.98)',
      '--orb1':'rgba(108,140,255,0.12)','--orb2':'rgba(167,139,250,0.08)',
      '--logo-text':'#0e1225'
    }
  },
  orchid: {
    name: 'Orchid Noir', icon: 'flower-2', type: 'dark',
    colors: ['#2a1e30','#d4a5e5','#e879a0','#f0c27a'],
    vars: {
      '--bg':'#150e1a','--bg2':'#1f1628','--bg3':'#2a1e30',
      '--accent':'#d4a5e5','--accent2':'#e879a0','--accent3':'#f0c27a',
      '--coral':'#ff8a80','--green':'#6bcb77','--pink':'#e879a0',
      '--text':'#f8f0ff','--text2':'#c9b8d6','--text3':'#9480a5',
      '--border':'rgba(212,165,229,0.08)','--card':'#1f1628','--card2':'#2a1e30',
      '--nav-bg':'rgba(21,14,26,0.92)','--drop-bg':'rgba(24,16,30,0.98)',
      '--orb1':'rgba(212,165,229,0.12)','--orb2':'rgba(232,121,160,0.08)',
      '--logo-text':'#150e1a'
    }
  },
  sunset: {
    name: 'Sunset', icon: 'sunset', type: 'dark',
    colors: ['#2a2018','#f0c27a','#ff8a80','#a78bfa'],
    vars: {
      '--bg':'#1a1410','--bg2':'#241c14','--bg3':'#2e241c',
      '--accent':'#f0c27a','--accent2':'#ff8a80','--accent3':'#a78bfa',
      '--coral':'#ff8a80','--green':'#6bcb77','--pink':'#e879a0',
      '--text':'#faf5ef','--text2':'#d4c4ac','--text3':'#a09080',
      '--border':'rgba(240,194,122,0.08)','--card':'#241c14','--card2':'#2e241c',
      '--nav-bg':'rgba(26,20,16,0.92)','--drop-bg':'rgba(30,22,18,0.98)',
      '--orb1':'rgba(240,194,122,0.12)','--orb2':'rgba(255,138,128,0.08)',
      '--logo-text':'#1a1410'
    }
  },
  forest: {
    name: 'Forest', icon: 'trees', type: 'dark',
    colors: ['#1a2e1a','#6bcb77','#a5d6a7','#f0c27a'],
    vars: {
      '--bg':'#0e1a0e','--bg2':'#142814','--bg3':'#1a2e1a',
      '--accent':'#6bcb77','--accent2':'#a5d6a7','--accent3':'#f0c27a',
      '--coral':'#ff8a80','--green':'#6bcb77','--pink':'#dba4c7',
      '--text':'#f0faf0','--text2':'#b8d4b8','--text3':'#80a080',
      '--border':'rgba(107,203,119,0.08)','--card':'#142814','--card2':'#1a2e1a',
      '--nav-bg':'rgba(14,26,14,0.92)','--drop-bg':'rgba(16,30,16,0.98)',
      '--orb1':'rgba(107,203,119,0.12)','--orb2':'rgba(165,214,167,0.08)',
      '--logo-text':'#0e1a0e'
    }
  },
  aero: {
    name: 'Aero', icon: 'cloud', type: 'light',
    colors: ['#e8f4f0','#0d9488','#6366f1','#f59e0b'],
    vars: {
      '--bg':'#f0f7f4','--bg2':'#e4eeea','--bg3':'#d8e6e0',
      '--accent':'#0d9488','--accent2':'#6366f1','--accent3':'#f59e0b',
      '--coral':'#ef4444','--green':'#16a34a','--pink':'#ec4899',
      '--text':'#1a2e28','--text2':'#4a6860','--text3':'#7a9a90',
      '--border':'rgba(13,148,136,0.12)','--card':'#e4eeea','--card2':'#d8e6e0',
      '--nav-bg':'rgba(240,247,244,0.95)','--drop-bg':'rgba(236,244,240,0.98)',
      '--orb1':'rgba(13,148,136,0.08)','--orb2':'rgba(99,102,241,0.06)',
      '--logo-text':'#f0f7f4'
    }
  },
  rose: {
    name: 'Rosé', icon: 'heart', type: 'light',
    colors: ['#fce4ec','#e91e63','#9c27b0','#ff9800'],
    vars: {
      '--bg':'#fef2f4','--bg2':'#fce4ec','--bg3':'#f8d4dc',
      '--accent':'#e91e63','--accent2':'#9c27b0','--accent3':'#ff9800',
      '--coral':'#f44336','--green':'#4caf50','--pink':'#e91e63',
      '--text':'#2a1a1e','--text2':'#6a4a52','--text3':'#9a7a82',
      '--border':'rgba(233,30,99,0.1)','--card':'#fce4ec','--card2':'#f8d4dc',
      '--nav-bg':'rgba(254,242,244,0.95)','--drop-bg':'rgba(252,228,236,0.98)',
      '--orb1':'rgba(233,30,99,0.06)','--orb2':'rgba(156,39,176,0.05)',
      '--logo-text':'#fef2f4'
    }
  },
  cotton: {
    name: 'Cotton Candy', icon: 'candy', type: 'light',
    colors: ['#e8e0f0','#7c4dff','#e040fb','#ff6e40'],
    vars: {
      '--bg':'#f5f0fa','--bg2':'#ece4f4','--bg3':'#e0d6ec',
      '--accent':'#7c4dff','--accent2':'#e040fb','--accent3':'#ff6e40',
      '--coral':'#ff5252','--green':'#69f0ae','--pink':'#e040fb',
      '--text':'#1a1428','--text2':'#5a4a6a','--text3':'#8a7a9a',
      '--border':'rgba(124,77,255,0.1)','--card':'#ece4f4','--card2':'#e0d6ec',
      '--nav-bg':'rgba(245,240,250,0.95)','--drop-bg':'rgba(240,232,248,0.98)',
      '--orb1':'rgba(124,77,255,0.06)','--orb2':'rgba(224,64,251,0.05)',
      '--logo-text':'#f5f0fa'
    }
  }
};

/* ── Make SVG icon ───────────────────────── */
function makeIcon(name, size) {
  size = size || 16;
  return '<i data-lucide="' + name + '" style="width:' + size + 'px;height:' + size + 'px;display:inline-block;vertical-align:middle"></i>';
}

/* ── Apply Theme ────────────────────────── */
function applyTheme(id) {
  const theme = THEMES[id];
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));

  // Update nav background
  document.querySelectorAll('nav').forEach(nav => {
    nav.style.background = theme.vars['--nav-bg'];
  });

  // Update orbs
  const orbs = document.querySelectorAll('.bg-orb');
  if (orbs[0]) orbs[0].style.background = theme.vars['--orb1'];
  if (orbs[1]) orbs[1].style.background = theme.vars['--orb2'];

  // Update logo mark text color
  document.querySelectorAll('.logo-mark').forEach(el => {
    el.style.color = theme.vars['--logo-text'];
  });

  // Update dropdown backgrounds
  document.querySelectorAll('.nav-drop-menu-inner, .nav-dropdown').forEach(el => {
    el.style.background = theme.vars['--drop-bg'];
  });

  // Save
  localStorage.setItem('ee_theme', id);

  // Update picker active state
  document.querySelectorAll('.tp-option').forEach(el => {
    el.classList.toggle('active', el.dataset.theme === id);
  });
}

/* ── Theme Picker UI ────────────────────── */
function createThemePicker() {
  // Floating button — SVG palette icon
  const btn = document.createElement('button');
  btn.id = 'themeToggleBtn';
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>';
  btn.title = 'Đổi giao diện';
  btn.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;width:48px;height:48px;border-radius:50%;border:0.5px solid var(--border);font-size:22px;cursor:pointer;background:var(--card2);color:var(--text);box-shadow:0 4px 20px rgba(0,0,0,0.3);transition:all .2s;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px)';
  // Move up on mobile to avoid bottom nav overlap
  if (window.innerWidth <= 900) { btn.style.bottom = '80px'; }
  btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.1)');
  btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');

  // Panel
  const panel = document.createElement('div');
  panel.id = 'themePanel';
  var panelBottom = window.innerWidth <= 900 ? '138px' : '82px';
  panel.style.cssText = 'position:fixed;bottom:' + panelBottom + ';right:24px;z-index:9998;width:280px;border-radius:16px;padding:18px;background:var(--card);border:0.5px solid var(--border);box-shadow:0 12px 40px rgba(0,0,0,0.4);backdrop-filter:blur(20px);display:none;opacity:0;transform:translateY(10px);transition:opacity .2s,transform .2s;max-height:70vh;overflow-y:auto';

  const currentTheme = localStorage.getItem('ee_theme') || 'aura';

  function renderPanel() {
    const activeTheme = localStorage.getItem('ee_theme') || 'aura';
    let html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><span style="font-family:\'Fraunces\',serif;font-size:16px;color:var(--text)">Giao diện</span><button id="tpClose" style="background:none;border:none;cursor:pointer;color:var(--text3);padding:4px;display:flex"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';

    Object.entries(THEMES).forEach(([id, t]) => {
      const isActive = id === activeTheme;
      html += '<button class="tp-option' + (isActive ? ' active' : '') + '" data-theme="' + id + '" style="display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:10px;border:1.5px solid ' + (isActive ? 'var(--accent)' : 'var(--border)') + ';background:' + (isActive ? 'rgba(100,216,165,0.08)' : 'var(--card2)') + ';cursor:pointer;transition:all .15s;font-family:\'DM Sans\',sans-serif;color:var(--text);font-size:12px;text-align:left;position:relative">';
      html += '<div style="display:flex;gap:3px;flex-shrink:0">';
      t.colors.forEach(function(c) {
        html += '<span style="width:8px;height:8px;border-radius:50%;background:' + c + ';display:inline-block;border:0.5px solid rgba(0,0,0,0.15)"></span>';
      });
      html += '</div>';
      html += '<span style="font-weight:500;font-size:11px;white-space:nowrap">' + t.name + '</span>';
      if (isActive) {
        html += '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-left:auto;flex-shrink:0"><polyline points="20 6 9 17 4 12"/></svg>';
      }
      html += '</button>';
    });

    html += '</div>';
    panel.innerHTML = html;

    // Re-bind close button
    panel.querySelector('#tpClose').addEventListener('click', closePanel);

    // Re-bind theme selection
    panel.querySelectorAll('.tp-option').forEach(opt => {
      opt.addEventListener('click', () => {
        applyTheme(opt.dataset.theme);
        renderPanel(); // Re-render entire panel to avoid checkmark accumulation
        // Update panel bg
        setTimeout(() => {
          panel.style.background = getComputedStyle(document.documentElement).getPropertyValue('--card');
          panel.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border');
        }, 50);
      });
    });
  }

  renderPanel();
  document.body.appendChild(panel);
  document.body.appendChild(btn);

  // Toggle panel
  let isOpen = false;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen = !isOpen;
    if (isOpen) {
      renderPanel(); // Fresh render each time
      panel.style.display = 'block';
      panel.style.background = getComputedStyle(document.documentElement).getPropertyValue('--card');
      requestAnimationFrame(() => {
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
      });
    } else {
      closePanel();
    }
  });

  function closePanel() {
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(10px)';
    setTimeout(() => { panel.style.display = 'none'; }, 200);
    isOpen = false;
  }

  // Click outside to close
  document.addEventListener('click', (e) => {
    if (isOpen && !panel.contains(e.target) && e.target !== btn) closePanel();
  });
}

/* ── Init ────────────────────────────────── */
(function initTheme() {
  const saved = localStorage.getItem('ee_theme');
  if (saved && THEMES[saved]) {
    applyTheme(saved);
  }
  // Create picker when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createThemePicker);
  } else {
    createThemePicker();
  }
})();
