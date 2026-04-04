(function(){
  "use strict";

  var GITHUB_BASE = "https://matt122004-beep.github.io/theoed-preview/";

  /* ── Course slug → dark page file ── */
  var courseMap = {
    "sabbath-sunday-scripture-history":        "sabbath-course-page.html",
    "william-foy-black-prophet":              "william-foy-course-page.html",
    "what-did-ellen-white-see":               "ellen-white-visions-course-page.html",
    "hell-and-afterlife":                     "hell-course-page.html",
    "how-to-study-bible":                     "how-to-study-bible-course-page.html",
    "how-to-do-exegesis":                     "exegesis-course-page.html",
    "how-we-got-bible":                       "how-we-got-bible-course-page.html",
    "immoral-parables-jesus":                 "immoral-parables-course-page.html",
    "women-parables-jesus":                   "women-parables-course-page.html",
    "what-is-inspiration":                    "what-is-inspiration-course-page.html",
    "unusual-endings-mark-gospel":            "snakes-poisons-course-page.html",
    "jonah-bias-of-pious":                    "jonah-course-page.html",
    "galatians-guide-early-church":           "galatians-course-page.html",
    "rewriting-scripture-adventism":          "rewriting-scripture-course-page.html",
    "the-gospel-of-judas":                    "gospel-of-judas-course-page.html",
    "hermeneutics-101":                       "hermeneutics-101-course-page.html",
    "abraham-sacrifice-isaac":                "abrahams-sacrifice-course-page.html",
    "book-of-job-arguments-plot-twists":      "is-god-good-job-course-page.html",
    "faking-paul":                            "faking-paul-course-page.html",
    "jesus-child-early-legends":              "jesus-as-a-child-course-page.html",
    "virgin-birth-origins":                   "born-of-a-virgin-course-page.html",
    "book-of-job-origins":                    "job-origins-course-page.html",
    "Revelation-and-Enoch":                   "revelation-enoch-course-page.html",
    "parables-enoch-messianic-prophecy":       "parables-of-enoch-course-page.html",
    "lost-prophecies-daniel":                 "lost-prophecies-daniel-course-page.html",
    "gender-sexuality-bible":                 "gender-sexuality-course-page.html",
    "womens-ministry-thecla":                 "thecla-course-page.html",
    "book-of-enoch-adventist-study-watchers": "book-of-watchers-course-page.html",
    "early-jesus-traditions":                 "early-jesus-traditions-course-page.html",
    "LGBTQ-Bible":                            "lgbtq-course-page.html"
  };

  /* ── Site page path → dark page file ── */
  var pageMap = {
    "/":                        "index.html",
    "/pages/home":              "index.html",
    "/pages/about-us":          "about-us.html",
    "/collections":             "classes.html",
    "/pages/pricing":           "pricing.html",
    "/pages/how-it-works":      "how-it-works.html",
    "/pages/theoai":            "theoai.html",
    "/pages/faq":               "faq.html",
    "/pages/certificates":      "certificates.html",
    "/pages/contact":           "contact.html"
  };

  var path = window.location.pathname;
  var darkFile = null;

  /* ── Match course pages ── */
  var courseMatch = path.match(/^\/courses\/([^\/]+)/);
  if (courseMatch && courseMap[courseMatch[1]]) {
    darkFile = courseMap[courseMatch[1]];
  }

  /* ── Match site pages ── */
  if (!darkFile) {
    var normalized = path.replace(/\/$/, "") || "/";
    if (pageMap[normalized]) {
      darkFile = pageMap[normalized];
    }
  }

  /* ── No match → do nothing, let Thinkific render normally ── */
  if (!darkFile) return;

  /* ── STEP 1: Immediately hide Thinkific content to prevent flash ── */
  var hideStyle = document.createElement("style");
  hideStyle.id = "dark-page-hide";
  hideStyle.textContent = [
    "body > *:not(#dark-page-container):not(script):not(style) { display: none !important; }",
    "#dark-page-container { display: block; }",
    "#dark-page-loading {",
    "  position: fixed; top: 0; left: 0; width: 100%; height: 100%;",
    "  background: #0a0a0f; display: flex; align-items: center; justify-content: center;",
    "  z-index: 99999; font-family: 'Inter', sans-serif; color: rgba(255,255,255,0.5);",
    "  font-size: 0.9rem; letter-spacing: 0.05em;",
    "}"
  ].join("\n");
  document.documentElement.appendChild(hideStyle);

  /* ── STEP 2: Show a minimal loading state ── */
  var loader = document.createElement("div");
  loader.id = "dark-page-loading";
  loader.innerHTML = '<div style="text-align:center;"><div style="width:32px;height:32px;border:2px solid rgba(212,175,55,0.3);border-top-color:#d4af37;border-radius:50%;animation:dpspin 0.8s linear infinite;margin:0 auto 12px;"></div>Loading...</div>';
  var spinStyle = document.createElement("style");
  spinStyle.textContent = "@keyframes dpspin{to{transform:rotate(360deg)}}";
  document.documentElement.appendChild(spinStyle);
  document.documentElement.appendChild(loader);

  /* ── STEP 3: Fetch the dark page from GitHub Pages ── */
  fetch(GITHUB_BASE + darkFile)
    .then(function(res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then(function(html) {
      /* Parse the fetched HTML */
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, "text/html");

      /* Extract all <style> blocks from <head> */
      var styles = doc.querySelectorAll("head style");

      /* Extract <body> content */
      var bodyContent = doc.body.innerHTML;

      /* Also extract any <link> tags for fonts */
      var links = doc.querySelectorAll('head link[rel="stylesheet"]');

      /* ── STEP 4: Build the dark page container ── */
      var container = document.createElement("div");
      container.id = "dark-page-container";

      /* Inject stylesheet links — fix relative paths to point to GitHub Pages */
      links.forEach(function(link) {
        var href = link.getAttribute("href");
        /* Rewrite relative paths to absolute GitHub Pages URLs */
        if (href && !href.startsWith("http") && !href.startsWith("//")) {
          href = GITHUB_BASE + href.replace(/^\.\//, "");
        }
        if (!document.querySelector('link[href="' + href + '"]')) {
          var newLink = document.createElement("link");
          newLink.rel = "stylesheet";
          newLink.href = href;
          if (link.crossOrigin) newLink.crossOrigin = link.crossOrigin;
          document.head.appendChild(newLink);
        }
      });

      /* Inject style blocks — fix relative url() paths */
      styles.forEach(function(s) {
        var newStyle = document.createElement("style");
        var cssText = s.textContent;
        /* Rewrite relative url() paths in CSS to absolute */
        cssText = cssText.replace(/url\(\s*['"]?(?!https?:\/\/|data:|\/\/)([^'")]+)['"]?\s*\)/g, function(match, p1) {
          return "url('" + GITHUB_BASE + p1 + "')";
        });
        newStyle.textContent = cssText;
        document.head.appendChild(newStyle);
      });

      /* Inject body content */
      container.innerHTML = bodyContent;

      /* Remove the loader */
      if (loader.parentNode) loader.parentNode.removeChild(loader);

      /* Append to document body */
      document.body.appendChild(container);

      /* ── STEP 5: Execute inline <script> tags from the dark page ── */
      var scripts = container.querySelectorAll("script");
      scripts.forEach(function(oldScript) {
        var newScript = document.createElement("script");
        if (oldScript.src) {
          var scriptSrc = oldScript.getAttribute("src");
          /* Fix relative script paths */
          if (scriptSrc && !scriptSrc.startsWith("http") && !scriptSrc.startsWith("//")) {
            scriptSrc = GITHUB_BASE + scriptSrc.replace(/^\.\//, "");
          }
          newScript.src = scriptSrc;
          if (oldScript.async) newScript.async = true;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });

      /* ── STEP 6: Fix relative asset paths ── */
      container.querySelectorAll('img[src^="assets/"], a[href^="assets/"]').forEach(function(el) {
        var attr = el.hasAttribute("src") ? "src" : "href";
        el.setAttribute(attr, GITHUB_BASE + el.getAttribute(attr));
      });

      /* Fix relative page links (e.g., classes.html → /collections) */
      var reversePageMap = {};
      Object.keys(pageMap).forEach(function(k) { reversePageMap[pageMap[k]] = k; });
      Object.keys(courseMap).forEach(function(k) { reversePageMap[courseMap[k]] = "/courses/" + k; });

      container.querySelectorAll("a[href]").forEach(function(a) {
        var href = a.getAttribute("href");
        /* Map dark page filenames back to Thinkific paths */
        if (reversePageMap[href]) {
          a.setAttribute("href", reversePageMap[href]);
        }
        /* Fix relative links like "sabbath-course-page.html" */
        if (href.match(/^[a-z].*\.html$/)) {
          if (reversePageMap[href]) {
            a.setAttribute("href", reversePageMap[href]);
          }
        }
      });

    })
    .catch(function(err) {
      /* On failure, show Thinkific's default page as fallback */
      console.warn("[dark-pages] Failed to load:", err);
      if (hideStyle.parentNode) hideStyle.parentNode.removeChild(hideStyle);
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    });

})();
