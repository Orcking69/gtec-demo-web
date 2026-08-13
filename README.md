# GTEC website — demo prototype

A static, dependency-free prototype of a website for **Gopalganj Textile
Engineering College (GTEC)**, built to show teachers/authorities what an
official site could look like — enough to make the case for a real
`.edu.bd` domain and institutional email accounts.

**This is a demo.** There is no real backend, no real database, and no
real student/teacher data anywhere in this repository. The login system
is a client-side simulation only (see `js/auth-demo.js`).

## Running it locally

No build step, no npm install. Either:

- Open `index.html` directly in a browser, or
- Serve the folder as static files, e.g.:
  ```
  python3 -m http.server 8000
  ```
  then visit `http://localhost:8000`.

## Demo logins

| Portal  | Username  | Password  |
|---------|-----------|-----------|
| Student | `student` | `demo123` |
| Teacher | `teacher` | `demo123` |

Credentials are also printed directly on each login page. Login state is
kept in `sessionStorage`, so it clears when the tab closes — useful for
repeated live demos.

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo, e.g. `gtec-demo-web`.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a
   branch`, branch `main`, folder `/ (root)`.
4. Save. The site will be published at
   `https://<username>.github.io/gtec-demo-web/`.

No configuration file, workflow, or build step is required — every
internal link in this site uses a relative path (`about.html`, not
`/about.html`), so it works correctly at a GitHub Pages subpath.

## File structure

```
index.html              Home
about.html               History, BUTEX affiliation, principal's message
academics.html           Departments, sample faculty, sample routine
admissions.html          Eligibility, steps, sample fees
notices.html              Full notice board
results.html              Sample results view
resources.html            Sample downloadable resources (non-functional)
contact.html              Contact details, map, demo message form
student-login.html        Demo student login
student-dashboard.html    Demo student dashboard (session-gated)
teacher-login.html        Demo teacher login
teacher-dashboard.html    Demo teacher dashboard (session-gated)
css/style.css             Shared styles
js/main.js                Mobile nav toggle
js/auth-demo.js           Simulated login — NOT real authentication
images/                   Placeholder SVG imagery (logo, campus, faculty)
```

## Content marked `[SAMPLE TEXT]`

History, fee figures, faculty names/photos, results data, and contact
details are all placeholders clearly labelled in the page copy or with a
"Sample" badge. Replace these with GTEC's real content before this goes
any further than a pitch demo.

## Before this becomes the real site

`js/auth-demo.js` says this explicitly in its own comments, but worth
repeating here: the login simulation in this repo must **not** be reused
for a production site. A real GTEC site needs a real backend — server-side
authentication, hashed passwords, proper sessions, HTTPS, and access
control — none of which this prototype has.
