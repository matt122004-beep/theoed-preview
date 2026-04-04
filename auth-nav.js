(function(){
  "use strict";

  /* ── Inject dropdown CSS once ── */
  var style = document.createElement("style");
  style.textContent = [
    ".auth-dropdown-wrap { position: relative; display: inline-block; }",
    ".auth-dropdown-btn { cursor: pointer; user-select: none; }",
    ".auth-dropdown-menu {",
    "  display: none;",
    "  position: absolute;",
    "  top: calc(100% + 8px);",
    "  right: 0;",
    "  min-width: 200px;",
    "  background: rgba(20, 20, 25, 0.96);",
    "  backdrop-filter: blur(20px);",
    "  -webkit-backdrop-filter: blur(20px);",
    "  border: 1px solid rgba(255,255,255,0.1);",
    "  border-radius: 12px;",
    "  padding: 0.5rem 0;",
    "  box-shadow: 0 12px 40px rgba(0,0,0,0.5);",
    "  z-index: 10000;",
    "  opacity: 0;",
    "  transform: translateY(-8px);",
    "  transition: opacity 0.2s ease, transform 0.2s ease;",
    "}",
    ".auth-dropdown-menu.open {",
    "  display: block;",
    "  opacity: 1;",
    "  transform: translateY(0);",
    "}",
    ".auth-dropdown-menu a {",
    "  display: flex;",
    "  align-items: center;",
    "  gap: 0.75rem;",
    "  padding: 0.7rem 1.25rem;",
    "  color: rgba(255,255,255,0.85);",
    "  text-decoration: none;",
    "  font-family: 'Inter', sans-serif;",
    "  font-size: 0.9rem;",
    "  font-weight: 400;",
    "  transition: background 0.15s ease, color 0.15s ease;",
    "}",
    ".auth-dropdown-menu a:hover {",
    "  background: rgba(212,175,55,0.1);",
    "  color: #d4af37;",
    "}",
    ".auth-dropdown-menu a svg {",
    "  width: 16px; height: 16px;",
    "  stroke: currentColor; fill: none;",
    "  stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;",
    "}",
    ".auth-dropdown-divider {",
    "  height: 1px;",
    "  background: rgba(255,255,255,0.08);",
    "  margin: 0.35rem 0;",
    "}",
    ".auth-dropdown-btn .auth-caret {",
    "  display: inline-block;",
    "  margin-left: 6px;",
    "  border-left: 4px solid transparent;",
    "  border-right: 4px solid transparent;",
    "  border-top: 5px solid currentColor;",
    "  transition: transform 0.2s ease;",
    "}",
    ".auth-dropdown-btn.open .auth-caret {",
    "  transform: rotate(180deg);",
    "}"
  ].join("\n");
  document.head.appendChild(style);

  /* ── SVG icons (inline, no external deps) ── */
  var icons = {
    dashboard: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    account:   '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>',
    signout:   '<svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>'
  };

  function updateNavForAuth() {
    var user = window.ThinkificUser;

    // If no bridge data or not signed in, leave nav as-is
    if (!user || !user.signedIn) {
      document.querySelectorAll(".nav-actions").forEach(function(el) {
        el.classList.add("auth-ready");
      });
      return;
    }

    // User is signed in — replace nav actions with dropdown
    document.querySelectorAll(".nav-actions").forEach(function(navActions) {
      navActions.innerHTML = "";

      // "My Dashboard" link (always visible)
      var dashLink = document.createElement("a");
      dashLink.href = "/enrollments";
      dashLink.className = "nav-link sign-in";
      dashLink.textContent = "My Dashboard";
      navActions.appendChild(dashLink);

      // Dropdown wrapper
      var wrap = document.createElement("div");
      wrap.className = "auth-dropdown-wrap";

      // Trigger button
      var btn = document.createElement("span");
      btn.className = "btn-primary btn-sm auth-dropdown-btn";
      btn.innerHTML = (user.firstName ? "Hi, " + user.firstName : "My Courses") +
                      ' <span class="auth-caret"></span>';
      wrap.appendChild(btn);

      // Dropdown menu
      var menu = document.createElement("div");
      menu.className = "auth-dropdown-menu";
      menu.innerHTML = [
        '<a href="/enrollments">' + icons.dashboard + "My Dashboard</a>",
        '<a href="/account">' + icons.account + "My Account</a>",
        '<div class="auth-dropdown-divider"></div>',
        '<a href="/users/sign_out">' + icons.signout + "Sign Out</a>"
      ].join("");
      wrap.appendChild(menu);

      navActions.appendChild(wrap);
      navActions.classList.add("auth-ready");

      // Toggle on click
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = menu.classList.contains("open");
        closeAllDropdowns();
        if (!isOpen) {
          menu.classList.add("open");
          btn.classList.add("open");
          // Force reflow for animation
          void menu.offsetHeight;
        }
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function() {
      closeAllDropdowns();
    });

    // Close on Escape key
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") closeAllDropdowns();
    });

    // Hide "Sign In to Watch" links for signed-in users
    document.querySelectorAll('a[href*="users/sign_in"]').forEach(function(link) {
      if (link.closest(".nav-actions")) return;
      link.style.display = "none";
    });
  }

  function closeAllDropdowns() {
    document.querySelectorAll(".auth-dropdown-menu.open").forEach(function(m) {
      m.classList.remove("open");
    });
    document.querySelectorAll(".auth-dropdown-btn.open").forEach(function(b) {
      b.classList.remove("open");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateNavForAuth);
  } else {
    updateNavForAuth();
  }
})();
