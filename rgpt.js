(function() {
  // Only run on the test home page
  if (window.location.pathname !== '/pages/test-home-page') return;
  
  // Inject Google Fonts
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap';
  document.head.appendChild(link);

  // Create the R-GPT sections container
  var container = document.createElement('div');
  container.id = 'haven-rgpt-sections';
  
  container.innerHTML = `
<style>
#haven-rgpt-sections * { box-sizing: border-box; }
#haven-rgpt-sections { font-family: 'Inter', sans-serif; }
.rgpt25x-hero-premium{background:linear-gradient(135deg,#3D2B1A 0%,#2D2A26 50%,#4A3F2A 100%);color:#fff;padding:80px 20px;text-align:center;position:relative;overflow:hidden}
.rgpt25x-hero-premium__container{max-width:900px;margin:0 auto;position:relative;z-index:2;display:flex;flex-direction:column;gap:32px;align-items:center}
.rgpt25x-hero-premium__eyebrow{font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#C4A23E}
.rgpt25x-hero-premium__headline{font-family:'Playfair Display',serif;font-size:52px;font-weight:700;line-height:1.15;margin:0}
.rgpt25x-hero-premium__highlight{color:#C4A23E}
.rgpt25x-hero-premium__subheadline{font-size:18px;line-height:1.6;color:#E8E0D0;max-width:700px;margin:0}
.rgpt25x-hero-premium__cta-group{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
.rgpt25x-hero-premium__cta{display:inline-block;padding:16px 40px;border-radius:50vh;font-size:15px;font-weight:600;text-decoration:none;transition:all .3s ease}
.rgpt25x-hero-premium__cta--primary{background:#C4A23E;color:#fff}
.rgpt25x-hero-premium__cta--secondary{background:transparent;color:#C4A23E;border:2px solid #C4A23E}
.rgpt25x-hero-premium__stats{display:flex;gap:40px;justify-content:center;flex-wrap:wrap;padding-top:32px;border-top:1px solid rgba(196,162,62,.2);width:100%}
.rgpt25x-hero-premium__stat{text-align:center}
.rgpt25x-hero-premium__stat-number{font-family:'Playfair Display',serif;font-size:34px;font-weight:700;color:#C4A23E;margin:0 0 6px}
.rgpt25x-hero-premium__stat-label{font-size:12px;color:#B0A090;text-transform:uppercase;letter-spacing:1px}
.rgpt25x-trust{background:#fff;padding:60px 20px}
.rgpt25x-trust__inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:32px}
.rgpt25x-trust__item{text-align:center;padding:28px;border-radius:12px;background:#F5F0E8}
.rgpt25x-trust__icon{width:56px;height:56px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#C4A23E;color:#fff;font-size:26px}
.rgpt25x-trust__title{font-family:'Playfair Display',serif;font-size:19px;font-weight:700;color:#2D2A26;margin:0 0 10px}
.rgpt25x-trust__desc{font-size:14px;color:#4A4540;line-height:1.6;margin:0}
@media(max-width:768px){.rgpt25x-hero-premium__headline{font-size:34px}.rgpt25x-hero-premium__stats{gap:20px}}
</style>

<section class="rgpt25x-hero-premium">
  <div class="rgpt25x-hero-premium__container">
    <p class="rgpt25x-hero-premium__eyebrow">Seminary-Level Biblical Scholarship</p>
    <h1 class="rgpt25x-hero-premium__headline">Master the Bible.<br><span class="rgpt25x-hero-premium__highlight">Transform Your Leadership.</span></h1>
    <p class="rgpt25x-hero-premium__subheadline">Go deeper into Scripture with world-class scholars. Gain the clarity and confidence to lead with conviction—pastor, educator, or serious learner.</p>
    <div class="rgpt25x-hero-premium__cta-group">
      <a href="/pages/pricing" class="rgpt25x-hero-premium__cta rgpt25x-hero-premium__cta--primary">Start Your 7-Day Free Trial</a>
      <a href="/collections" class="rgpt25x-hero-premium__cta rgpt25x-hero-premium__cta--secondary">Explore 47 Courses</a>
    </div>
    <div class="rgpt25x-hero-premium__stats">
      <div class="rgpt25x-hero-premium__stat"><p class="rgpt25x-hero-premium__stat-number">657</p><p class="rgpt25x-hero-premium__stat-label">Students & Leaders</p></div>
      <div class="rgpt25x-hero-premium__stat"><p class="rgpt25x-hero-premium__stat-number">150+</p><p class="rgpt25x-hero-premium__stat-label">Hours of Content</p></div>
      <div class="rgpt25x-hero-premium__stat"><p class="rgpt25x-hero-premium__stat-number">47</p><p class="rgpt25x-hero-premium__stat-label">Courses</p></div>
      <div class="rgpt25x-hero-premium__stat"><p class="rgpt25x-hero-premium__stat-number">NAD</p><p class="rgpt25x-hero-premium__stat-label">Approved</p></div>
    </div>
  </div>
</section>

<section class="rgpt25x-trust">
  <div class="rgpt25x-trust__inner">
    <div class="rgpt25x-trust__item"><div class="rgpt25x-trust__icon">✓</div><h3 class="rgpt25x-trust__title">Scholarly Rigor</h3><p class="rgpt25x-trust__desc">Seminary-level content grounded in academic research, not generic theology.</p></div>
    <div class="rgpt25x-trust__item"><div class="rgpt25x-trust__icon">🎓</div><h3 class="rgpt25x-trust__title">NAD Recognized</h3><p class="rgpt25x-trust__desc">Approved for Continuing Education units. Your learning counts toward professional development.</p></div>
    <div class="rgpt25x-trust__item"><div class="rgpt25x-trust__icon">🌍</div><h3 class="rgpt25x-trust__title">Global Community</h3><p class="rgpt25x-trust__desc">657 students, pastors and educators from 40+ countries learning together.</p></div>
    <div class="rgpt25x-trust__item"><div class="rgpt25x-trust__icon">💰</div><h3 class="rgpt25x-trust__title">14-Day Guarantee</h3><p class="rgpt25x-trust__desc">Try risk-free. Full refund within 14 days, no questions asked.</p></div>
  </div>
</section>
  `;

  // Insert at the top of the main content area
  var main = document.querySelector('main') || document.querySelector('.site-main') || document.querySelector('#main-content') || document.body;
  main.insertBefore(container, main.firstChild);
})();
