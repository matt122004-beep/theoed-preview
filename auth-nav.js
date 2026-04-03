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

    // Update any standalone "Sign In to Watch" links on course pages
    document.querySelectorAll('a[href*="users/sign_in"]').forEach(function(link) {
      if (link.closest(".nav-actions")) return;
      link.textContent = "Go to Course";
      link.href = "/enrollments";
    });

    // For enrolled users, update "Start Trial" CTAs outside nav
    if (user.enrolledCourses && user.enrolledCourses.length > 0) {
      document.querySelectorAll('a[href*="order?ct="]').forEach(function(cta) {
        if (cta.closest(".nav-actions")) return;
        cta.textContent = "Continue Learning";
        cta.href = "/enrollments";
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateNavForAuth);
  } else {
    updateNavForAuth();
  }
})();
