(function() {
  'use strict';

  var path = window.location.pathname;

  // ─── COURSE DATA ──────────────────────────────────────────────────────────
  var courses = {
    '/courses/how-to-do-exegesis': {
      slug: 'how-to-do-exegesis',
      title: 'How to Do Exegesis:',
      titleHighlight: 'An Introduction',
      heroImage: 'https://import.cdn.thinkific.com/296355/eYr7UncwQamZbNpaRhk8_lot-and-his-daughters-master-of-the-prodigal-son.jpg',
      pills: ['Hermeneutics', 'Bible Methods', 'Hebrew Bible'],
      lessons: '8',
      hours: '6.5',
      ceu: '0.65',
      overview: 'Learn to read Scripture like a scholar. This course introduces the academic methods of biblical interpretation—source criticism, narrative criticism, and feminist criticism—using the vivid stories of Deborah (Judges 4–5) and Lot\'s Daughters (Genesis 19) as your primary texts. No seminary required.',
      chapters: [
        { title: '1. Approaching the Text', subtitle: 'Judges 4–5 & Genesis 19 — What are we reading?', lessons: 2 },
        { title: '2. The World Behind the Text', subtitle: 'Source Criticism — Who wrote this, and when?', lessons: 2 },
        { title: '3. The World of the Text', subtitle: 'Narrative Criticism — How does the story work?', lessons: 1 },
        { title: '4. The World in Front of the Text', subtitle: 'Feminist Criticism — Who gets to interpret?', lessons: 1 },
        { title: 'Final Cumulative Project', subtitle: 'Apply all three methods to a passage of your choice', lessons: 1 },
      ],
      categories: ['Hermeneutics', 'Hebrew Bible', 'Academic Methods'],
    },
    '/courses/what-did-ellen-white-see': {
      slug: 'what-did-ellen-white-see',
      title: 'What Did Ellen White See?',
      titleHighlight: 'Introducing Her Visions',
      heroImage: 'https://import.cdn.thinkific.com/296355/nm4yM1aSQ3GdYCTSNTyz_ellen_white-1248x1423.jpg',
      pills: ['Adventist History', 'Spirit of Prophecy', 'SDA Studies'],
      lessons: '8',
      hours: '5.5',
      ceu: '0.55',
      overview: 'A rigorous, honest introduction to Ellen White\'s visionary experiences. What do we actually know about how her visions worked? What did she claim to see—and what didn\'t she see? This course examines the historical record with scholarly care, exploring her changing views, borrowed sources, and the limits of prophetic authority.',
      chapters: [
        { title: '1. I Saw', subtitle: 'Distinguishing visions from interpretations', lessons: 1 },
        { title: '2. I Didn\'t See', subtitle: 'The missing tablets in the Ark — gaps in prophetic vision', lessons: 1 },
        { title: '3. I Changed', subtitle: 'Shifting views across her publications', lessons: 1 },
        { title: '4. I Borrowed', subtitle: 'Supplementing visions with outside sources', lessons: 1 },
        { title: 'Final Cumulative Project', subtitle: 'Analyze a White vision using course methods', lessons: 1 },
      ],
      categories: ['Adventist History', 'Spirit of Prophecy', 'Prophetology'],
    }
  };

  var course = courses[path];
  if (!course) return;

  // ─── INJECT FONTS ──────────────────────────────────────────────────────────
  if (!document.querySelector('#rgpt25x-fonts')) {
    var lnk = document.createElement('link');
    lnk.id = 'rgpt25x-fonts';
    lnk.rel = 'stylesheet';
    lnk.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600;800&display=swap';
    document.head.appendChild(lnk);
  }

  // ─── CSS ───────────────────────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = `
    .rgpt25x-theosu{
      --rgpt25x-bg-page:#f5f1e3;
      --rgpt25x-dark-900:#0d0d0d;
      --rgpt25x-dark-850:#121212;
      --rgpt25x-dark-750:#1a1a1a;
      --rgpt25x-text:#ffffff;
      --rgpt25x-text-dim:#cfcfcf;
      --rgpt25x-pill:#242424;
      --rgpt25x-stroke:rgba(255,255,255,0.10);
      --rgpt25x-green:#36d97d;
      background:var(--rgpt25x-bg-page);
      font-family:Inter,system-ui,-apple-system,sans-serif;
    }
    .rgpt25x-wrap{
      display:grid;grid-template-columns:1fr;min-height:780px;isolation:isolate;
    }
    @media(min-width:768px){
      .rgpt25x-wrap{grid-template-columns:58% 42%;min-height:820px;}
    }
    .rgpt25x-hero{
      position:relative;padding:72px 22px 96px;
      background:linear-gradient(180deg,rgba(0,0,0,.58),rgba(0,0,0,.62)),
        var(--rgpt25x-hero-img) center/cover no-repeat;
      color:#fff;
    }
    @media(min-width:768px){.rgpt25x-hero{padding:96px 56px 140px;}}
    .rgpt25x-back{display:inline-block;margin-bottom:18px;font-size:.95rem;font-weight:600;color:var(--rgpt25x-text-dim);text-decoration:none;}
    .rgpt25x-back:hover{color:var(--rgpt25x-green);}
    .rgpt25x-title{font-family:"Playfair Display",Georgia,serif;font-weight:700;letter-spacing:-0.02em;line-height:1.04;font-size:clamp(2.4rem,6vw,4.4rem);margin:0 0 12px;}
    .rgpt25x-titleHighlight{color:var(--rgpt25x-green);}
    .rgpt25x-pills{display:flex;gap:10px;flex-wrap:wrap;margin:8px 0 18px;}
    .rgpt25x-pill{background:var(--rgpt25x-pill);border:1px solid var(--rgpt25x-stroke);color:#f3f3f3;border-radius:999px;padding:8px 14px;font-weight:700;font-size:.92rem;}
    .rgpt25x-meta{display:flex;gap:16px;flex-wrap:wrap;margin:0 0 20px;font-size:.9rem;color:var(--rgpt25x-text-dim);font-weight:600;}
    .rgpt25x-ctaRow{display:flex;gap:14px;flex-wrap:wrap;margin:12px 0 20px;}
    .rgpt25x-btn{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:800;border:1px solid transparent;font-size:1rem;}
    .rgpt25x-btn--green{background:var(--rgpt25x-green);color:#052513;}
    .rgpt25x-btn--white{background:#fff;color:#0e0e0e;border-color:#fff;}
    .rgpt25x-priceLine{font-size:1.2rem;margin:6px 0 28px;color:var(--rgpt25x-text-dim);}
    .rgpt25x-h2{font-family:"Playfair Display",Georgia,serif;font-weight:700;font-size:clamp(1.35rem,2.1vw,2rem);margin:0 0 10px;color:#fff;}
    .rgpt25x-overview{color:var(--rgpt25x-text-dim);max-width:720px;line-height:1.7;font-size:.98rem;}
    .rgpt25x-cats{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px;}
    .rgpt25x-cat{background:#2b2b2b;border:1px solid var(--rgpt25x-stroke);color:#ececec;border-radius:999px;padding:8px 14px;font-weight:700;font-size:.9rem;}
    .rgpt25x-rightCol{
      background:linear-gradient(180deg,var(--rgpt25x-dark-900),var(--rgpt25x-dark-850));
      padding:56px 22px 64px;color:#fff;
    }
    @media(min-width:768px){.rgpt25x-rightCol{padding:120px 32px 80px;}}
    .rgpt25x-rightHeading{font-family:"Playfair Display",Georgia,serif;font-weight:700;font-size:1.5rem;margin:22px 0 14px;color:#fff;}
    .rgpt25x-instructor{display:flex;align-items:center;gap:16px;padding:16px 18px;background:var(--rgpt25x-dark-750);border-radius:14px;border:1px solid var(--rgpt25x-stroke);}
    .rgpt25x-instructor img{width:80px;height:80px;border-radius:999px;object-fit:cover;border:2px solid var(--rgpt25x-stroke);flex-shrink:0;}
    .rgpt25x-instName{font-size:1.2rem;font-weight:800;letter-spacing:-0.01em;}
    .rgpt25x-instBio{margin:.35rem 0 0;font-size:.88rem;color:var(--rgpt25x-text-dim);line-height:1.5;}
    .rgpt25x-acc{display:grid;gap:10px;margin-top:4px;}
    .rgpt25x-accItem{border:1px solid var(--rgpt25x-stroke);border-radius:14px;overflow:hidden;background:var(--rgpt25x-dark-750);}
    .rgpt25x-accHead{display:flex;align-items:flex-start;justify-content:space-between;cursor:pointer;padding:14px 16px;font-weight:800;font-size:.95rem;gap:10px;}
    .rgpt25x-accTitle{flex:1;}
    .rgpt25x-accSub{font-weight:400;font-size:.82rem;color:var(--rgpt25x-text-dim);margin-top:3px;}
    .rgpt25x-accLessons{font-size:.78rem;color:var(--rgpt25x-green);font-weight:700;white-space:nowrap;margin-top:2px;}
    .rgpt25x-iconBtn{width:26px;height:26px;border-radius:999px;display:inline-grid;place-items:center;background:#0f0f0f;border:1px solid #2a2a2a;color:#d9d9d9;flex-shrink:0;}
    .rgpt25x-bottom-cta{background-color:#5d3754;color:#fff;padding:3.5rem 1rem;text-align:center;}
    .rgpt25x-bottom-cta h2{font-family:"Playfair Display",serif;font-size:1.9rem;margin-bottom:1.5rem;font-weight:500;}
    .rgpt25x-cta-buttons{display:flex;justify-content:center;flex-wrap:wrap;gap:1rem;}
    .rgpt25x-cta-btn-primary{font-family:inherit;padding:.85rem 2rem;border-radius:6px;font-weight:600;text-decoration:none;background:#f4b400;color:#000;display:inline-block;}
    .rgpt25x-cta-btn-secondary{font-family:inherit;padding:.85rem 2rem;border-radius:6px;font-weight:600;text-decoration:none;background:#fff;color:#5d3754;display:inline-block;}
  `;
  document.head.appendChild(style);

  // ─── BUILD HTML ────────────────────────────────────────────────────────────
  var chaptersHTML = course.chapters.map(function(ch) {
    return `<div class="rgpt25x-accItem">
      <div class="rgpt25x-accHead">
        <div class="rgpt25x-accTitle">
          ${ch.title}
          <div class="rgpt25x-accSub">${ch.subtitle}</div>
          <div class="rgpt25x-accLessons">${ch.lessons} lesson${ch.lessons > 1 ? 's' : ''}</div>
        </div>
        <span class="rgpt25x-iconBtn">+</span>
      </div>
    </div>`;
  }).join('');

  var catsHTML = course.categories.map(function(c) {
    return `<span class="rgpt25x-cat">${c}</span>`;
  }).join('');

  var pillsHTML = course.pills.map(function(p) {
    return `<span class="rgpt25x-pill">${p}</span>`;
  }).join('');

  var html = `<div class="rgpt25x-theosu" id="rgpt25x-course-page">
    <div class="rgpt25x-wrap" style="--rgpt25x-hero-img:url('${course.heroImage}')">

      <!-- LEFT: HERO -->
      <div class="rgpt25x-hero">
        <a href="/collections" class="rgpt25x-back">← Back to All Courses</a>
        <h1 class="rgpt25x-title">
          ${course.title}<br>
          <span class="rgpt25x-titleHighlight">${course.titleHighlight}</span>
        </h1>
        <div class="rgpt25x-pills">${pillsHTML}</div>
        <div class="rgpt25x-meta">
          <span>${course.lessons} Lessons</span>
          <span>${course.hours} hrs</span>
          <span>${course.ceu} CEU</span>
        </div>
        <div class="rgpt25x-ctaRow">
          <a href="/enrollments/new?course_id=${course.slug}" class="rgpt25x-btn rgpt25x-btn--green">Watch Free for 7 Days</a>
          <a href="/users/sign_in" class="rgpt25x-btn rgpt25x-btn--white">Sign In to Watch</a>
        </div>
        <p class="rgpt25x-priceLine">Starting at $6/week</p>
        <h2 class="rgpt25x-h2">Overview</h2>
        <p class="rgpt25x-overview">${course.overview}</p>
        <h2 class="rgpt25x-h2" style="margin-top:24px;">Categories</h2>
        <div class="rgpt25x-cats">${catsHTML}</div>
      </div>

      <!-- RIGHT: DARK PANEL -->
      <div class="rgpt25x-rightCol">
        <h2 class="rgpt25x-rightHeading">Instructor</h2>
        <div class="rgpt25x-instructor">
          <img src="https://import.cdn.thinkific.com/296355/QkAYNcqVSEuAEfQENu3l_294364878_10160302204599656_5516492105094483282_n.jpg" alt="Matthew J. Korpman">
          <div>
            <div class="rgpt25x-instName">Matthew J. Korpman</div>
            <div class="rgpt25x-instBio">Adjunct Professor of Biblical Studies, La Sierra University. PhD candidate in New Testament, Yale Divinity School graduate.</div>
          </div>
        </div>
        <h2 class="rgpt25x-rightHeading">Course Content</h2>
        <div class="rgpt25x-acc">${chaptersHTML}</div>
      </div>

    </div>

    <!-- BOTTOM CTA -->
    <div class="rgpt25x-bottom-cta">
      <h2>Unlimited Streaming Classes FREE for 7 Days</h2>
      <div class="rgpt25x-cta-buttons">
        <a href="/pages/pricing" class="rgpt25x-cta-btn-primary">Get Started</a>
        <a href="/collections" class="rgpt25x-cta-btn-secondary">Browse All Courses</a>
      </div>
    </div>
  </div>`;

  // ─── INJECT: replace Thinkific's default content ───────────────────────────
  // Hide default content immediately to prevent flash
  var hideStyle = document.createElement('style');
  hideStyle.id = 'rgpt25x-hide';
  hideStyle.textContent = '.course-landing-page main > *:not(#rgpt25x-course-page){display:none!important}';
  document.head.appendChild(hideStyle);

  var main = document.querySelector('main') || document.querySelector('#main-content') || document.body;
  var wrapper = document.createElement('div');
  wrapper.innerHTML = html;

  // Insert at the very beginning of main
  if (main.firstChild) {
    main.insertBefore(wrapper.firstChild, main.firstChild);
  } else {
    main.appendChild(wrapper.firstChild);
  }

})();
