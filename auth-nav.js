(function(){
  "use strict";

  function updateNavForAuth() {
    var user = window.ThinkificUser;

    // If no bridge data or not signed in, leave nav as-is
    if (!user || !user.signedIn) {
      document.querySelectorAll(".nav-actions").forEach(function(el) {
        el.classList.add("auth-ready");
      });
      return;
    }

    // User is signed in — replace nav actions
    document.querySelectorAll(".nav-actions").forEach(function(navActions) {
      navActions.innerHTML = "";

      // "My Dashboard" link
      var dashLink = document.createElement("a");
      dashLink.href = "/enrollments";
      dashLink.className = "nav-link sign-in";
      dashLink.textContent = "My Dashboard";
      navActions.appendChild(dashLink);

      // Personalized greeting button
      var greeting = document.createElement("a");
      greeting.href = "/enrollments";
      greeting.className = "btn-primary btn-sm";
      greeting.textContent = user.firstName ? "Hi, " + user.firstName : "My Courses";
      navActions.appendChild(greeting);

      navActions.classList.add("auth-ready");
    });

    // Hide "Sign In to Watch" links for signed-in users (they're already signed in)
    document.querySelectorAll('a[href*="users/sign_in"]').forEach(function(link) {
      if (link.closest(".nav-actions")) return;
      link.style.display = "none";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateNavForAuth);
  } else {
    updateNavForAuth();
  }
})();
