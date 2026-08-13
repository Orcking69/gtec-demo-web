/*
 * auth-demo.js
 * ---------------------------------------------------------------------
 * THIS IS A UI SIMULATION ONLY. It is not real authentication.
 *
 * There is no server, no database, and no password hashing here — just
 * a hardcoded object checked in the browser, plus a flag written to
 * sessionStorage so the dashboard pages know whether to show themselves
 * or bounce back to the login form. Anyone with the browser console can
 * bypass this in five seconds, which is fine, because its only job is
 * to let a room full of teachers click "log in" during a pitch demo and
 * see what a student/teacher portal could feel like.
 *
 * DO NOT reuse this file, this pattern, or this sessionStorage flag for
 * the real production GTEC site. A real site needs a real backend:
 * server-side auth, hashed + salted passwords, sessions or tokens
 * issued by a server, HTTPS, and proper access control — none of which
 * exists here.
 * ---------------------------------------------------------------------
 */
(function () {
  var DEMO_ACCOUNTS = {
    student: { username: "student", password: "demo123", role: "student", displayName: "Nusrat Jahan" },
    teacher: { username: "teacher", password: "demo123", role: "teacher", displayName: "Prof. Kamal Hossain" }
  };

  var SESSION_KEY = "gtecDemoSession";

  function attemptLogin(role, username, password) {
    var account = DEMO_ACCOUNTS[role];
    if (account && username === account.username && password === account.password) {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ role: role, displayName: account.displayName, loggedInAt: Date.now() })
      );
      return true;
    }
    return false;
  }

  function getSession(expectedRole) {
    var raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      var session = JSON.parse(raw);
      if (expectedRole && session.role !== expectedRole) return null;
      return session;
    } catch (e) {
      return null;
    }
  }

  function logout(redirectTo) {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = redirectTo || "index.html";
  }

  function wireLoginForm(formSelector, role, loginPageRedirect, dashboardUrl) {
    var form = document.querySelector(formSelector);
    if (!form) return;
    var errorBox = document.querySelector(".form-error");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var username = form.querySelector('[name="username"]').value.trim();
      var password = form.querySelector('[name="password"]').value;

      if (attemptLogin(role, username, password)) {
        window.location.href = dashboardUrl;
      } else {
        if (errorBox) {
          errorBox.textContent = "Incorrect username or password. Try the demo credentials printed above.";
          errorBox.classList.add("is-visible");
        }
      }
    });
  }

  function guardDashboard(role, loginPageUrl) {
    var session = getSession(role);
    if (!session) {
      window.location.href = loginPageUrl;
      return null;
    }
    return session;
  }

  // Expose a small namespace for pages to call into.
  window.gtecAuth = {
    wireLoginForm: wireLoginForm,
    guardDashboard: guardDashboard,
    logout: logout,
    getSession: getSession
  };
})();
