/* ═══════════════════════════════════════════
   EasyEnglish Theme System
   8 themes · localStorage · auto-apply
   ═══════════════════════════════════════════ */

const THEMES = {
  aura: {
    name: 'Aura', icon: '🌿', type: 'dark',
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
    name: 'Midnight', icon: '🌙', type: 'dark',
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
    name: 'Orchid Noir', icon: '🌸', type: 'dark',
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
    name: 'Sunset', icon: '🌅', type: 'dark',
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
    name: 'Forest', icon: '🌲', type: 'dark',
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
    name: 'Aero', icon: '☁️', type: 'light',
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
    name: 'Rosé', icon: '🌷', type: 'light',
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
    name: 'Cotton Candy', icon: '🍬', type: 'light',
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
  // Floating button
  const btn = document.createElement('button');
  btn.id = 'themeToggleBtn';
  btn.innerHTML = '🎨';
  btn.title = 'Đổi giao diện';
  btn.style.cssText = `
    position:fixed;bottom:24px;right:24px;z-index:9999;
    width:48px;height:48px;border-radius:50%;border:none;
    font-size:22px;cursor:pointer;
    background:var(--card2);color:var(--text);
    box-shadow:0 4px 20px rgba(0,0,0,0.3);
    transition:all .2s;display:flex;align-items:center;justify-content:center;
    backdrop-filter:blur(10px);border:0.5px solid var(--border);
  `;
  btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.1)');
  btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');

  // Panel
  const panel = document.createElement('div');
  panel.id = 'themePanel';
  panel.style.cssText = `
    position:fixed;bottom:82px;right:24px;z-index:9998;
    width:280px;border-radius:16px;padding:18px;
    background:var(--card);border:0.5px solid var(--border);
    box-shadow:0 12px 40px rgba(0,0,0,0.4);
    backdrop-filter:blur(20px);
    display:none;opacity:0;transform:translateY(10px);
    transition:opacity .2s,transform .2s;
  `;

  const currentTheme = localStorage.getItem('ee_theme') || 'aura';

  let html = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
      <span style="font-family:'Fraunces',serif;font-size:16px;color:var(--text)">Giao diện</span>
      <button id="tpClose" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--text3);padding:2px">✕</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
  `;

  Object.entries(THEMES).forEach(([id, t]) => {
    const isActive = id === currentTheme;
    html += `
      <button class="tp-option${isActive ? ' active' : ''}" data-theme="${id}" style="
        display:flex;align-items:center;gap:8px;padding:10px 12px;
        border-radius:10px;border:1.5px solid ${isActive ? 'var(--accent)' : 'var(--border)'};
        background:${isActive ? 'rgba(100,216,165,0.08)' : 'var(--card2)'};
        cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif;
        color:var(--text);font-size:12px;text-align:left;
      ">
        <span style="font-size:16px">${t.icon}</span>
        <div>
          <div style="font-weight:500;font-size:12px">${t.name}</div>
          <div style="display:flex;gap:3px;margin-top:3px">
            ${t.colors.map(c => `<span style="width:10px;height:10px;border-radius:50%;background:${c};display:inline-block;border:0.5px solid rgba(0,0,0,0.15)"></span>`).join('')}
          </div>
        </div>
        ${isActive ? '<span style="margin-left:auto;font-size:12px">✓</span>' : ''}
      </button>
    `;
  });

  html += '</div>';
  panel.innerHTML = html;

  document.body.appendChild(panel);
  document.body.appendChild(btn);

  // Toggle panel
  let isOpen = false;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen = !isOpen;
    if (isOpen) {
      panel.style.display = 'block';
      // Update panel colors after showing
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

  panel.querySelector('#tpClose').addEventListener('click', closePanel);

  // Theme selection
  panel.querySelectorAll('.tp-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const id = opt.dataset.theme;
      applyTheme(id);
      // Refresh panel appearance
      panel.querySelectorAll('.tp-option').forEach(o => {
        const active = o.dataset.theme === id;
        o.classList.toggle('active', active);
        o.style.borderColor = active ? 'var(--accent)' : 'var(--border)';
        o.style.background = active ? 'rgba(100,216,165,0.08)' : 'var(--card2)';
        // Update checkmark
        const check = o.querySelector('span[style*="margin-left:auto"]');
        if (check) check.remove();
        if (active) {
          const cm = document.createElement('span');
          cm.style.cssText = 'margin-left:auto;font-size:12px';
          cm.textContent = '✓';
          o.appendChild(cm);
        }
      });
      // Update panel bg
      setTimeout(() => {
        panel.style.background = getComputedStyle(document.documentElement).getPropertyValue('--card');
        panel.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border');
      }, 50);
    });
  });

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
