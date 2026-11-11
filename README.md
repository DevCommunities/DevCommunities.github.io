# DevCommu - A Revolutionary Tech Education Provider

We're Mentor and Devloper with passion to make the world a better place.
By providing quality education to every student that is willing to learn.
We craft better syllabus, Invent new ways to teach and Tracking student progress
with The goal of to made learning hard stuff a fun thing.

## Get In Touch
- [YouTube](https://www.youtube.com/@DevCommu)
- [Facebook](https://www.facebook.com/DevCommu)
- [Instagram](https://www.instagram.com/DevCommu)
- [Twitter](https://www.twitter.com/DevCommuTh)

## DevCommu service pages (no database)

Run `npm run dev`, then open the local URL shown in the terminal. Run `npm run build` for production output in `dist/`.

- `/bootcamps`: filter courses and view past events. Course detail URLs are generated from `src/lib/content.ts`.
- `/tutoring`: filter instructors and prepare a consultation message.
- `/team`: instructor profiles from the existing team content.
- `/success`: university acceptances, competition awards, and student projects.

Edit `src/lib/content.ts` to update courses, availability, statistics, and success stories, then rebuild. Course descriptions are initial proposed outlines; confirm them before opening enrollment. `planned`, `open`, and `closed` control the course status. Photos on course cards are from the existing event archive. Unknown statistics display `—`; stories remain empty until verified student content is supplied. Instructor biographies come from the original site and should be reviewed for current roles.

### SEO maintenance

Student project URLs use `/projects/<slug>/`. Previous `/project/` URLs and project ID aliases redirect to that primary URL; legacy camp projects such as `/project/dev1/` remain available. Static builds emit HTML redirects with a canonical tag and `noindex`; HTTP status handling depends on the hosting platform.

Run `npm run build && npm run check:seo` to check sitemap URLs, canonical URLs, and project redirects. When adding or replacing local images, run `python3 scripts/generate-image-sizes.py` (requires Pillow) to refresh intrinsic dimensions used by project, camp, and tutor images.

For Google Search Console HTML-tag verification, set `PUBLIC_GOOGLE_SITE_VERIFICATION` to the tag's `content` value in the build environment and redeploy. Verify the property in Search Console and submit `https://devcommu.org/sitemap-index.xml` (or the configured `SITE_URL`). DNS verification is also available independently of this setting. Actual indexing and Core Web Vitals need to be checked on the deployed site.

Consultation forms only prepare text for the visitor to copy. They do not submit, store leads, send email, or reserve seats. The staff editor described below manages published site content separately.

Analytics are optional: set `PUBLIC_GA_ID` and/or `PUBLIC_META_PIXEL_ID` from `.env.example`. Scripts load only after visitor consent. Preparing a message is not counted as a successful registration. Set `SITE_URL` in the build environment for canonical URLs, sitemap, and robots.txt.

### Mock preview enabled

The current content includes explicitly labeled fictional university stories, awards, project ideas, sample statistics, course dates/prices, and tutor availability. These are for design review only. Replace them with verified content and remove preview labels before publishing. Project cards expand to show concepts; they do not link to fictitious working demos.

### Bootcamp archive — September 2026

The Bootcamp pages now use 24 actual event records supplied by the owner in `src/data/camps.json`, replacing the three mock courses and duplicate legacy listing. Posters were matched by CAMPHUB URL against the supplied ZIP manifest and saved in `public/images/camps`. The 19 additional archive posters without matching supplied table rows were not published. All 24 supplied events ended before September 9, 2026 and are marked closed. Historical prices are labeled as such. Unexplained date/price asterisks remain flagged in event detail notes. Other sections still contain labeled mock content.

## Staff admin

`/admin/` manages the link hub's camps, competitions, banner, social links, and shared tutoring prices. Staff sign in through Cloudflare Access using an `@devcommu.org` address. The backend verifies the signed Access token and the email domain for every admin request.

Production entry point: https://devcommu.org/admin/. The login page offers username/password and a separate staff email option. Staff receive a one-time PIN in their `@devcommu.org` mailbox. The `DevCommu staff admin` Access application protects `devcommu.org/admin/staff*` and `devcommu.org/api/admin/staff*` with the reusable `DevCommu staff` allow policy. Access cookies are HTTP-only and scoped to the hostname so authenticated draft previews and unpublished images can load. Every other admin, preview, and private media request is authenticated by the backend through either the verified Access cookie or an active contractor session.

After email sign-in, open **บัญชีผู้ร่วมงาน** to create an individual contractor username. The server generates a 32-character random password, shown once for copying. Contractors can edit and publish site content but cannot manage accounts. Only verified staff can create, disable, re-enable, or reset accounts. Disabling or resetting a password immediately invalidates previous sessions. No public registration or email address is required for contractors.

Private R2 objects under `auth/` store salted PBKDF2-SHA512 password hashes, hashed session tokens, and conditional login-attempt counters. Passwords have 192 bits of server-generated entropy; the 100,000-iteration hash stays within Cloudflare's deployed PBKDF2 cap. Sessions last 12 hours and use Secure, HTTP-only, SameSite=Strict cookies. Login requests are limited per username, IP hash, and globally in one-minute windows; stale concurrent reservations fail closed. Expired/revoked session records are removed on use. An R2 lifecycle rule for `auth/sessions/` after one day can additionally remove abandoned expired records. Preview deployments have no production bucket binding.

The `HUB_CONTENT` R2 binding stores one document containing draft and published snapshots, plus uploaded images. Save a draft before opening its preview. Publishing switches the public snapshot in one conditional R2 write and updates `/@devcommu/` immediately. Stale edits return a conflict and keep the editor's changes on screen. Uploaded images remain private to staff until included in published content. Camps stop appearing after the registration deadline in Bangkok time. Competitions can remain in the archive.

Production setup uses the existing `devcommunities` Pages project and a dedicated `devcommu-site-content` R2 bucket. Configure the two staff Access destinations listed above; a broad `/admin*` Access destination would prevent password-only users from reaching the login page. Allow the email domain `devcommu.org` through email one-time PIN. Set `ACCESS_TEAM_DOMAIN` and the application's `ACCESS_AUD` in `wrangler.jsonc`, then regenerate bindings with `pnpm dlx wrangler@4.160.0 types worker-configuration.d.ts --include-runtime=false --strict-vars=false`. Keep production and preview storage isolated if enabling editing on preview deployments.

Run `pnpm build`, then `pnpm dev:pages` for local Pages Functions and R2 emulation. The ordinary Astro development server does not run the backend. Local private requests require valid authentication, matching production behavior. `pnpm test:admin` checks both authentication methods, contractor permissions/revocation, rate limiting, validation, conditional writes, draft publishing, and media privacy. `pnpm check:backend` generates ignored runtime declarations and type-checks the backend. `pnpm check:admin-build` verifies external scripts compatible with the admin CSP and a POST-only native password form. Wrangler is used as a pinned development tool through `pnpm dlx`. The admin adds no application dependencies.
