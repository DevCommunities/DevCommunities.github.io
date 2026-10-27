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

Forms only prepare text for the visitor to copy. They do not submit, store leads, send email, or reserve seats. No database, authentication, admin CMS, or backend is included. A real contact destination has not been supplied; the visitor must send the copied message using their existing contact channel.

Analytics are optional: set `PUBLIC_GA_ID` and/or `PUBLIC_META_PIXEL_ID` from `.env.example`. Scripts load only after visitor consent. Preparing a message is not counted as a successful registration. Set `SITE_URL` in the build environment for canonical URLs, sitemap, and robots.txt.

### Mock preview enabled

The current content includes explicitly labeled fictional university stories, awards, project ideas, sample statistics, course dates/prices, and tutor availability. These are for design review only. Replace them with verified content and remove preview labels before publishing. Project cards expand to show concepts; they do not link to fictitious working demos.

### Bootcamp archive — September 2026

The Bootcamp pages now use 24 actual event records supplied by the owner in `src/data/camps.json`, replacing the three mock courses and duplicate legacy listing. Posters were matched by CAMPHUB URL against the supplied ZIP manifest and saved in `public/images/camps`. The 19 additional archive posters without matching supplied table rows were not published. All 24 supplied events ended before September 9, 2026 and are marked closed. Historical prices are labeled as such. Unexplained date/price asterisks remain flagged in event detail notes. Other sections still contain labeled mock content.
