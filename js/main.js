/*
 * main.js — shared, non-auth behaviour used on every page.
 * Just the mobile nav toggle. No frameworks, no build step.
 */
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Dropdown items ("Academic", "Notices") — the caret button expands the
  // submenu on tap/click without navigating away from the parent link.
  nav.querySelectorAll(".nav-caret").forEach(function (caret) {
    caret.addEventListener("click", function () {
      var item = caret.closest(".nav-item");
      var isOpen = item.classList.toggle("is-open");
      caret.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });

  // Close the mobile menu after a nav link is tapped.
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();
