# CSS Upgrades — Port từ dm.html vào style.css

Bảo AI: "Thêm những đoạn CSS này vào style.css, đặt sau phần :root variables"

---

## 1. Font — Đổi từ DM Sans sang Plus Jakarta Sans

```css
/* Thêm vào <head> của tất cả HTML files (thay link font cũ) */
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">

/* Trong style.css — đổi body font */
body {
  font-family: 'Plus Jakarta Sans', 'DM Sans', sans-serif;
}
```

---

## 2. Ambient Orbs — Background động

```css
/* Thêm vào cuối style.css */

/* === AMBIENT ORBS === */
.bg-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(140px);
  pointer-events: none;
  z-index: -1;
  opacity: 0.4;
  will-change: transform;
  contain: strict;
}
.orb-1 {
  width: 600px;
  height: 600px;
  background: rgba(100, 216, 165, 0.15);
  top: -10%;
  right: -5%;
  animation: orbFloat 20s infinite alternate;
}
.orb-2 {
  width: 500px;
  height: 500px;
  background: rgba(206, 189, 255, 0.1);
  bottom: -10%;
  left: -5%;
  animation: orbFloat 25s infinite alternate-reverse;
}
.orb-3 {
  width: 400px;
  height: 400px;
  background: rgba(255, 220, 101, 0.05);
  top: 40%;
  left: 30%;
  animation: orbFloat 18s infinite linear;
}
@keyframes orbFloat {
  from { transform: translate(0, 0); }
  to   { transform: translate(50px, 100px); }
}

/* Ẩn orb trên mobile để tiết kiệm pin */
@media(max-width: 900px) {
  .orb-1 { width: 300px; height: 300px; opacity: 0.2; }
  .orb-2 { width: 250px; height: 250px; opacity: 0.15; }
  .orb-3 { display: none; }
}
```

Thêm vào HTML (ngay sau thẻ `<body>`):
```html
<div class="bg-orb orb-1"></div>
<div class="bg-orb orb-2"></div>
<div class="bg-orb orb-3"></div>
```

---

## 3. Glassmorphism — Card đẹp hơn

```css
/* === GLASSMORPHISM === */
.glass {
  background: var(--card);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
}

.glass:hover {
  background: var(--card-hover);
  border-color: rgba(100, 216, 165, 0.2);
  transition: all 0.3s ease;
}
```

Thêm vào :root variables:
```css
--card-hover: rgba(40, 55, 59, 0.8);
```

---

## 4. Scroll Reveal — Elements fade in khi scroll

```css
/* === SCROLL REVEAL === */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delays cho children */
.reveal:nth-child(2) { transition-delay: 100ms; }
.reveal:nth-child(3) { transition-delay: 200ms; }
.reveal:nth-child(4) { transition-delay: 300ms; }

/* Disable trên mobile để không lag */
@media(prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

Thêm JS vào common.js (hoặc cuối index.html):
```js
// Scroll reveal observer
var revealEls = document.querySelectorAll('.reveal');
var revealObs = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(function(el){ revealObs.observe(el); });
```

---

## 5. Shimmer — Hiệu ứng loading đẹp

```css
/* === SHIMMER EFFECT === */
.shimmer {
  position: relative;
  overflow: hidden;
}
.shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.04),
    transparent
  );
  animation: shimmerMove 3s infinite;
}
@keyframes shimmerMove {
  0%   { left: -100%; }
  100% { left: 100%; }
}
```

---

## 6. Hover Scale — Spring animation cho cards

```css
/* === SPRING HOVER === */
.hover-lift {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.3s ease;
}
.hover-lift:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Nhẹ hơn cho các element nhỏ */
.hover-scale {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hover-scale:hover {
  transform: scale(1.02);
}
```

---

## 7. Gradient Text — Heading sang hơn

```css
/* === GRADIENT TEXT === */
.text-gradient {
  background: linear-gradient(
    135deg,
    var(--accent) 0%,
    var(--accent2) 50%,
    var(--accent3) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Animated gradient */
.text-gradient-animated {
  background: linear-gradient(
    270deg,
    var(--accent),
    var(--accent2),
    var(--accent3),
    var(--accent)
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 6s ease infinite;
}
@keyframes gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

---

## 8. Progress Ring — SVG circle đẹp hơn thanh ngang

```css
/* === PROGRESS RING === */
.ring-fill {
  transition: stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1);
}
```

HTML template:
```html
<div style="position:relative;width:120px;height:120px">
  <svg width="120" height="120" style="transform:rotate(-90deg)">
    <!-- Track -->
    <circle cx="60" cy="60" r="50" fill="none"
            stroke="var(--border)" stroke-width="8"/>
    <!-- Fill -->
    <circle cx="60" cy="60" r="50" fill="none"
            stroke="var(--accent)" stroke-width="8"
            stroke-linecap="round"
            stroke-dasharray="314.159"
            stroke-dashoffset="314.159"
            class="ring-fill"
            id="progressRing"/>
  </svg>
  <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
    <span style="font-family:Fraunces;font-size:2rem;font-weight:700" id="ringLabel">0</span>
    <span style="font-size:11px;color:var(--text3)" id="ringSub">XP</span>
  </div>
</div>
```

JS để set progress (0-100%):
```js
function setRingProgress(pct) {
  var circumference = 314.159;
  var offset = circumference - (pct / 100) * circumference;
  document.getElementById('progressRing').style.strokeDashoffset = offset;
}
```

---

## 9. Skeleton Loader — Loading state đẹp

```css
/* === SKELETON LOADER === */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg2) 25%,
    rgba(255,255,255,0.05) 50%,
    var(--bg2) 75%
  );
  background-size: 200% 100%;
  animation: skeletonLoad 1.5s infinite;
  border-radius: 8px;
}
@keyframes skeletonLoad {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 10. Page Enter Animation — Mỗi trang load đẹp

```css
/* === PAGE ENTER === */
.content {
  animation: pageEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes pageEnter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 11. Global Transition Curve — Tất cả interactions đều mượt

```css
/* Thêm vào đầu style.css sau :root */

/* Spring easing cho tất cả transitions */
*, *::before, *::after {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Chỉ apply transition khi cần — không apply mặc định */
button, a, .card, input, select {
  transition-property: transform, box-shadow, background, border-color, color, opacity;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## Thứ tự bảo AI thêm vào style.css:

1. Font (Plus Jakarta Sans)
2. Global transition curve
3. Ambient orbs
4. Glassmorphism
5. Scroll reveal + JS observer
6. Shimmer
7. Hover lift/scale
8. Gradient text
9. Progress ring
10. Skeleton loader
11. Page enter animation

## 12. Mobile Responsive — thêm vào cuối style.css

```css
@media(max-width: 900px) {

  /* Tắt hover trên touch — dùng active thay thế */
  .hover-lift:hover,
  .hover-scale:hover {
    transform: none;
    box-shadow: none;
  }
  .hover-lift:active { transform: scale(0.97); transition: transform 0.1s ease; }
  .hover-scale:active { transform: scale(0.97); transition: transform 0.1s ease; }

  /* Progress ring nhỏ hơn */
  .ring-wrap { width: 80px; height: 80px; }
  .ring-wrap svg { width: 80px; height: 80px; }
  .ring-wrap #ringLabel { font-size: 1.4rem; }

  /* Scroll reveal nhẹ hơn */
  .reveal {
    transform: translateY(16px);
    transition-duration: 0.5s;
  }

  /* Page enter nhẹ hơn */
  @keyframes pageEnter {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}

/* Màn hình rất nhỏ */
@media(max-width: 480px) {
  .shimmer::after { display: none; } /* tắt shimmer trên điện thoại yếu */
  .text-gradient-animated { animation: none; } /* tắt gradient animation */
}

/* Tắt tất cả animation nếu user bật reduce motion */
@media(prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .bg-orb { display: none; }
  .shimmer::after { display: none; }
  .reveal { opacity: 1; transform: none; }
}
```

---

## Lưu ý quan trọng:

- Bump version style.css: `style.css?v=5` trong tất cả HTML
- Test trên mobile sau khi thêm orbs — nếu lag thì giảm opacity hoặc tắt animation
- `prefers-reduced-motion` đã được handle trong scroll reveal — đủ rồi
