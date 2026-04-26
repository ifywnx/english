/* ═══════════════════════════════════════════
   EasyEnglish Theme System
   12 themes · localStorage · auto-apply
   ═══════════════════════════════════════════ */

const THEMES = {
  /* ── DARK THEMES ─────────────────────────── */
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
  y2k: {
    name: 'Y2K', icon: 'zap', type: 'dark',
    colors: ['#1a0a2e','#ff2d95','#00f0ff','#c0c0c0'],
    vars: {
      '--bg':'#0a0618','--bg2':'#140e28','--bg3':'#1a0a2e',
      '--accent':'#ff2d95','--accent2':'#00f0ff','--accent3':'#c0c0c0',
      '--coral':'#ff2d95','--green':'#00ff88','--pink':'#ff6ec7',
      '--text':'#f0e8ff','--text2':'#c8b8e8','--text3':'#8a78b0',
      '--border':'rgba(255,45,149,0.1)','--card':'#140e28','--card2':'#1e1438',
      '--nav-bg':'rgba(10,6,24,0.94)','--drop-bg':'rgba(14,10,32,0.98)',
      '--orb1':'rgba(255,45,149,0.12)','--orb2':'rgba(0,240,255,0.08)',
      '--logo-text':'#0a0618'
    }
  },

  /* ── LIGHT THEMES ────────────────────────── */
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
  },
  oldmoney: {
    name: 'Old Money', icon: 'landmark', type: 'light',
    colors: ['#f0ebe3','#5c6b4f','#8b7355','#c4a35a'],
    vars: {
      '--bg':'#f6f2ec','--bg2':'#ede8df','--bg3':'#e2ddd4',
      '--accent':'#5c6b4f','--accent2':'#8b7355','--accent3':'#c4a35a',
      '--coral':'#b85450','--green':'#5c6b4f','--pink':'#a07882',
      '--text':'#2c2a26','--text2':'#5a5650','--text3':'#8a8680',
      '--border':'rgba(92,107,79,0.12)','--card':'#ede8df','--card2':'#e2ddd4',
      '--nav-bg':'rgba(246,242,236,0.96)','--drop-bg':'rgba(240,235,227,0.98)',
      '--orb1':'rgba(92,107,79,0.07)','--orb2':'rgba(196,163,90,0.05)',
      '--logo-text':'#f6f2ec'
    }
  },
  kid: {
    name: 'Kid', icon: 'smile', type: 'light',
    colors: ['#fff3e0','#ff6d00','#2979ff','#00c853'],
    vars: {
      '--bg':'#fffbf5','--bg2':'#fff3e0','--bg3':'#ffe8cc',
      '--accent':'#ff6d00','--accent2':'#2979ff','--accent3':'#00c853',
      '--coral':'#ff1744','--green':'#00c853','--pink':'#ff4081',
      '--text':'#2e1f0e','--text2':'#6a5540','--text3':'#9a8570',
      '--border':'rgba(255,109,0,0.12)','--card':'#fff3e0','--card2':'#ffe8cc',
      '--nav-bg':'rgba(255,251,245,0.96)','--drop-bg':'rgba(255,243,224,0.98)',
      '--orb1':'rgba(255,109,0,0.08)','--orb2':'rgba(41,121,255,0.06)',
      '--logo-text':'#fffbf5'
    }
  },
  genz: {
    name: 'Gen Z', icon: 'sparkles', type: 'light',
    colors: ['#f0f5e8','#84cc16','#a78bfa','#f472b6'],
    vars: {
      '--bg':'#f5f8ef','--bg2':'#ecf2e0','--bg3':'#e0ebd0',
      '--accent':'#84cc16','--accent2':'#a78bfa','--accent3':'#f472b6',
      '--coral':'#fb7185','--green':'#84cc16','--pink':'#f472b6',
      '--text':'#1a2410','--text2':'#4a5a3a','--text3':'#7a8a6a',
      '--border':'rgba(132,204,22,0.12)','--card':'#ecf2e0','--card2':'#e0ebd0',
      '--nav-bg':'rgba(245,248,239,0.96)','--drop-bg':'rgba(236,242,224,0.98)',
      '--orb1':'rgba(132,204,22,0.08)','--orb2':'rgba(167,139,250,0.06)',
      '--logo-text':'#f5f8ef'
    }
  },
  /* ── NEW THEMES ─────────────────────────── */
  ocean: {
    name: 'Ocean Deep', icon: 'waves', type: 'dark',
    colors: ['#0a2540','#00d4aa','#38bdf8','#fbbf24'],
    vars: {
      '--bg':'#0a1628','--bg2':'#0f2035','--bg3':'#142a42',
      '--accent':'#00d4aa','--accent2':'#38bdf8','--accent3':'#fbbf24',
      '--coral':'#f87171','--green':'#34d399','--pink':'#c084fc',
      '--text':'#e8f4f8','--text2':'#94b8d0','--text3':'#5a8aaa',
      '--border':'rgba(0,212,170,0.08)','--card':'#0f2035','--card2':'#142a42',
      '--nav-bg':'rgba(10,22,40,0.94)','--drop-bg':'rgba(15,32,53,0.98)',
      '--orb1':'rgba(0,212,170,0.1)','--orb2':'rgba(56,189,248,0.06)',
      '--logo-text':'#0a1628'
    }
  },
  neon: {
    name: 'Neon City', icon: 'tv', type: 'dark',
    colors: ['#1a0a2e','#ff00ff','#00ffcc','#ffff00'],
    vars: {
      '--bg':'#0d0618','--bg2':'#150a28','--bg3':'#1e1038',
      '--accent':'#ff00ff','--accent2':'#00ffcc','--accent3':'#ffff00',
      '--coral':'#ff4466','--green':'#00ff88','--pink':'#ff66cc',
      '--text':'#f5e6ff','--text2':'#c8a0e8','--text3':'#8a60b0',
      '--border':'rgba(255,0,255,0.1)','--card':'#150a28','--card2':'#1e1038',
      '--nav-bg':'rgba(13,6,24,0.94)','--drop-bg':'rgba(21,10,40,0.98)',
      '--orb1':'rgba(255,0,255,0.08)','--orb2':'rgba(0,255,204,0.06)',
      '--logo-text':'#0d0618'
    }
  },
  lavender: {
    name: 'Lavender', icon: 'flower', type: 'light',
    colors: ['#f0e6ff','#8b5cf6','#ec4899','#f59e0b'],
    vars: {
      '--bg':'#f8f4ff','--bg2':'#f0e6ff','--bg3':'#e6d8f8',
      '--accent':'#8b5cf6','--accent2':'#ec4899','--accent3':'#f59e0b',
      '--coral':'#f87171','--green':'#34d399','--pink':'#ec4899',
      '--text':'#1e0a3a','--text2':'#4a2a6e','--text3':'#7a5a9e',
      '--border':'rgba(139,92,246,0.1)','--card':'#f0e6ff','--card2':'#e6d8f8',
      '--nav-bg':'rgba(248,244,255,0.96)','--drop-bg':'rgba(240,230,255,0.98)',
      '--orb1':'rgba(139,92,246,0.08)','--orb2':'rgba(236,72,153,0.06)',
      '--logo-text':'#f8f4ff'
    }
  },
  matcha: {
    name: 'Matcha', icon: 'coffee', type: 'light',
    colors: ['#e8f0e0','#4a7c59','#8fbc8f','#d4a574'],
    vars: {
      '--bg':'#f4f8f0','--bg2':'#e8f0e0','--bg3':'#dce8d0',
      '--accent':'#4a7c59','--accent2':'#8fbc8f','--accent3':'#d4a574',
      '--coral':'#c97c6b','--green':'#4a7c59','--pink':'#c8a0a0',
      '--text':'#1a2818','--text2':'#3a5038','--text3':'#6a806a',
      '--border':'rgba(74,124,89,0.1)','--card':'#e8f0e0','--card2':'#dce8d0',
      '--nav-bg':'rgba(244,248,240,0.96)','--drop-bg':'rgba(232,240,224,0.98)',
      '--orb1':'rgba(74,124,89,0.06)','--orb2':'rgba(143,188,143,0.04)',
      '--logo-text':'#f4f8f0'
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
  var isMobile = window.innerWidth <= 900;
  var btnBottom = isMobile ? '100px' : '24px';
  btn.style.cssText = 'position:fixed;bottom:' + btnBottom + ';right:' + (isMobile ? '16px' : '24px') + ';z-index:10000;width:48px;height:48px;border-radius:50%;border:0.5px solid var(--border);font-size:22px;cursor:pointer;background:var(--card2);color:var(--text);box-shadow:0 4px 20px rgba(0,0,0,0.3);transition:all .2s;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px);-webkit-tap-highlight-color:transparent';
  if (!isMobile) {
    btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.1)');
    btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');
  }

  // Panel
  const panel = document.createElement('div');
  panel.id = 'themePanel';
  var panelBottom = isMobile ? '160px' : '82px';
  var panelW = isMobile ? 'calc(100vw - 28px)' : '340px';
  var panelR = isMobile ? '14px' : '24px';
  panel.style.cssText = 'position:fixed;bottom:' + panelBottom + ';right:' + panelR + ';z-index:10001;width:' + panelW + ';border-radius:16px;padding:18px;background:var(--card);border:0.5px solid var(--border);box-shadow:0 12px 40px rgba(0,0,0,0.4);backdrop-filter:blur(20px);display:none;opacity:0;transform:translateY(10px);transition:opacity .2s,transform .2s;max-height:60vh;overflow-y:auto;-webkit-overflow-scrolling:touch';

  const currentTheme = localStorage.getItem('ee_theme') || 'aura';

  /* ── Render a single theme button ──────── */
  function renderThemeBtn(id, t, activeTheme) {
    var isActive = id === activeTheme;
    var s = '<button class="tp-option' + (isActive ? ' active' : '') + '" data-theme="' + id + '" style="display:flex;align-items:center;gap:6px;padding:8px 10px;border-radius:10px;border:1.5px solid ' + (isActive ? 'var(--accent)' : 'var(--border)') + ';background:' + (isActive ? 'rgba(100,216,165,0.08)' : 'var(--card2)') + ';cursor:pointer;transition:all .15s;font-family:\'DM Sans\',sans-serif;color:var(--text);font-size:12px;text-align:left;position:relative">';
    // Color dots
    s += '<div style="display:flex;gap:2px;flex-shrink:0">';
    t.colors.forEach(function(c) {
      s += '<span style="width:7px;height:7px;border-radius:50%;background:' + c + ';display:inline-block;border:0.5px solid rgba(0,0,0,0.15)"></span>';
    });
    s += '</div>';
    // Name
    s += '<span style="font-weight:500;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + t.name + '</span>';
    // Checkmark
    if (isActive) {
      s += '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-left:auto;flex-shrink:0"><polyline points="20 6 9 17 4 12"/></svg>';
    }
    s += '</button>';
    return s;
  }

  /* ── Section label style ───────────────── */
  var labelStyle = 'font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.2px;color:var(--text3);margin:0 0 6px 2px;font-family:\'DM Sans\',sans-serif';

  function renderPanel() {
    const activeTheme = localStorage.getItem('ee_theme') || 'aura';

    // Header
    var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">';
    html += '<span style="font-family:\'Fraunces\',serif;font-size:16px;color:var(--text)">Giao diện</span>';
    html += '<button id="tpClose" style="background:none;border:none;cursor:pointer;color:var(--text3);padding:4px;display:flex"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
    html += '</div>';

    // Dark section
    html += '<div style="' + labelStyle + '">Dark</div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:14px">';
    Object.entries(THEMES).forEach(function(entry) {
      if (entry[1].type === 'dark') html += renderThemeBtn(entry[0], entry[1], activeTheme);
    });
    html += '</div>';

    // Light section
    html += '<div style="' + labelStyle + '">Light</div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
    Object.entries(THEMES).forEach(function(entry) {
      if (entry[1].type === 'light') html += renderThemeBtn(entry[0], entry[1], activeTheme);
    });
    html += '</div>';

    panel.innerHTML = html;

    // Re-bind close button
    panel.querySelector('#tpClose').addEventListener('click', closePanel);

    // Re-bind theme selection
    panel.querySelectorAll('.tp-option').forEach(opt => {
      opt.addEventListener('click', () => {
        applyTheme(opt.dataset.theme);
        renderPanel();
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
      renderPanel();
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
