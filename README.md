# BC Study Guide Club — Frontend

Created by Ruhaan Sahi (Frontend) and Adham Eldalil (Backend)

React frontend for the BC Study Guide Club platform, built with Vite and React Router. It serves study guides and resources across the High School, AP, and IB diplomas, and handles club sign-up, contribution, and question submissions through a connected backend API.

This site was hosted on Microsoft Azure and reached 630+ unique users internationally. It's no longer live, as hosting for the server and domain was discontinued after the school year ended.

## Stack

## Stack

- **React 18 with React Router DOM v7** — builds the UI as components and handles all client-side navigation, including the dynamic `/IB/:class_id` route.
- **Vite** — runs the dev server with hot module reload and bundles the production build.
- **ESLint** — lints the codebase against the React and React Hooks rule sets defined in `eslint.config.js`.
- **Cloudinary SDK** — included for handling uploaded/hosted media such as study guide files and images.
- **js-cookie** — reads and writes the CSRF token cookie used to authenticate form submissions to the Django backend.

## Routing

Routing is handled in `src/Routes.jsx` using React Router. Static routes cover the main pages (`/`, `/AboutUs`, `/ContactUs`, `/StudyGuides`, `/IB`, `/AP`, `/Highschool`, `/Form`), with a catch-all `*` route to a 404 page.

The IB, AP, and High School sections each pull their class list from the backend rather than hardcoding it in the frontend. `src/Pages/IB.jsx` fetches `/r/classes/ib` on mount, renders a card per class, and on click calls `navigate(`/IB/${class_id}`)`. That resolves against a dynamic route:

```
<Route path="/IB/:class_id" element={<ClassResources />} />
```

`ClassResources.jsx` reads `class_id` out of the URL with `useParams`, then fetches `/r/class/${class_id}` for that class's resource list. So a single component and a single route handle every IB class rather than one page per class, and the resource list stays entirely driven by whatever the backend returns.

## Backend integration (SQL-backed resources)

The frontend holds no study guide content itself. Every resource, class list, and submission goes through REST calls to a backend (Django, based on the CSRF token flow) that's backed by a SQL database, as noted in the resume for this project.

The API base URL comes from an environment variable, `VITE_API_URL`, read via `import.meta.env.VITE_API_URL`, so the same build can point at a local or deployed backend without code changes.

Endpoints called from the frontend:
- `GET /r/classes/ib` (and equivalent for AP/High School) — list of classes for a diploma
- `GET /r/class/:class_id` — resources for a specific class, used by the dynamic route above
- `GET /getCSRFToken/` — issues a CSRF token
- `POST /contributeRequest/requestform/` — submits the contribute/question/join form

## Form submission mechanism

`src/Pages/dynamicform.jsx` is a single form component that changes its fields depending on what the user picks from a "What would you like to do?" dropdown:
- **Contribute a Study Guide** — adds diploma, GPA, school, subject, and a PDF file upload
- **Ask a Question** — adds school and a free-text question
- **Join the Club** — embeds a Google Form via iframe instead of using the custom form

Submission flow for the first two options:
1. On submit, form fields are packed into a `FormData` object (needed for the PDF upload alongside the text fields)
2. A CSRF token is fetched from `/getCSRFToken/` with `credentials: "include"` so the session cookie is sent
3. The `FormData` is POSTed to `/contributeRequest/requestform/` with the CSRF token in the `X-CSRFToken` header
4. On success, the form resets and a confirmation message shows for a few seconds; on failure, an error message shows and the user can retry

There's also client-side rate limiting on submission: a `canSubmit` flag disables the submit button after a successful send and re-enables it after 45 seconds, so the same session can't spam the endpoint. The submit button shows a loading state while the request is in flight.

## Other notable pieces

- **Shared nav pattern** — Most pages implement the same hamburger menu (open/close state, click-outside-to-close via refs and a document click listener) rather than sharing one nav component, so the same logic is duplicated across `main.jsx`, `study_guides.jsx`, `contact_us.jsx`, `about_us.jsx`, and `not_found.jsx`
- **SPA fallback routing** — `public/routes.json` rewrites all paths to `index.html` with a 200 status, which is what makes client-side routes like `/IB/ap-calculus` work correctly on a static host instead of 404ing at the server level

## Setup

```bash
npm install
npm run dev
```

Requires a `.env` file with:
```
VITE_API_URL=<backend base URL>
```

