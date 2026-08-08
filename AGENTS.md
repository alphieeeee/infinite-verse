# Infinite Verse Agent Guide

## Project Overview
Infinite Verse is a Next.js app for browsing Bible translations, books, chapters, and verses. The experience is built around a calm reading flow with:

- a shared top navbar
- hero sections on most pages
- breadcrumb navigation
- translation, book, chapter, and verse browsing
- Firebase email/password authentication
- per-user favorite verses stored in Realtime Database
- reusable gallery and carousel components

This project is intentionally simple and readable. Prefer small, focused components over clever abstractions.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- GSAP for page transitions and motion
- Embla Carousel for swipers
- Firebase Authentication and Realtime Database

## Important App Layout Rules

- The navbar is fixed at the top in `app/components/layout/Navbar.tsx`.
- The app shell in `app/layout.tsx` includes `AuthProvider`, the navbar, background, and global transition wrapper.
- `app/components/gsap/TransitionLayout.tsx` contains the spacer that keeps page content from sliding under the fixed navbar.
- The shared footer is rendered from `TransitionLayout`, after route content.
- Do not replace the spacer with page-level padding unless the whole shell is being redesigned.
- Use the shared hero pattern where possible so pages feel uniform.
- The mobile navbar uses a body portal for its full-screen menu because the blurred fixed header creates a containing block for fixed descendants.
- While the mobile menu is open, both `html` and `body` scrolling are locked and must be restored during cleanup.

## Page Structure

The app follows the route hierarchy below:

- `/` home page
- `/[translationId]` translation page
- `/[translationId]/[bookId]` chapter grid page
- `/[translationId]/[bookId]/[chapter]` verse page
- `/favorites` authenticated favorites page
- `/login` guest-only login page
- `/register` guest-only registration page

General page flow:

1. hero section
2. breadcrumbs
3. main content

The verse route is the exception in that the verse projector leads the page and the breadcrumb placement follows that experience.

Authentication behavior:

- Scripture routes are public.
- Signed-out users who select Favorites or try to save a verse are sent to `/login` with a safe `next` path.
- `/favorites` redirects signed-out users to login.
- `GuestOnly` prevents authenticated users from opening `/login` or `/register` and sends them back to `/`.

## Component Conventions

Prefer reusable components that are easy to compose:

- `PageHero` for shared 50vh-minimum hero sections
- `BookCarousel` for reusable book swipers
- `TranslationGallery` for translation cards
- `ChapterGrid` for chapter tiles
- `VerseHero` and `VerseSwiperGallery` for the verse projector flow
- `AuthProvider` and `useAuth` for shared client authentication state
- `GuestOnly` for routes that should only render to signed-out users
- `FavoritesList` for loading and removing the current user's favorites

When adding new UI:

- keep props small and explicit
- pass data down instead of duplicating fetch logic
- preserve existing responsive behavior
- keep interactive pieces accessible with keyboard and semantic HTML
- use the shared `routes` constant instead of repeating static route strings

## Data and API Rules

Bible data is sourced from `https://bible-api.com/data/...`.

Current endpoint patterns:

- random verse: `https://bible-api.com/data/[translation]/random`
- translations: `https://bible-api.com/data/`
- books: `https://bible-api.com/data/[translationId]`
- chapters: `https://bible-api.com/data/[translationId]/[bookId]`
- verses: `https://bible-api.com/data/[translationId]/[bookId]/[chapter]`

When working with API data:

- define explicit TypeScript types for response shapes
- handle missing or empty arrays with safe fallbacks
- keep response mapping close to the page or data helper that uses it
- preserve book order from the source data unless the user asks otherwise

## Firebase and Authentication Rules

Firebase client initialization lives in `lib/api/firebase.ts` and reads these public Next.js environment variables:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

Important constraints:

- Keep Firebase initialization lazy through `getFirebaseApp`, `getFirebaseAuth`, and `getFirebaseDatabase`.
- Do not validate or initialize Firebase at module scope; doing so breaks Next.js prerendering when deployment variables are unavailable during server evaluation.
- Authentication operations belong in `lib/api/auth.ts`.
- Favorite CRUD operations belong in `lib/api/favorites.ts`.
- This project uses Realtime Database, not Cloud Firestore.
- Favorite records use `${userId}/favorites/${translationId}/${bookId}/${chapter}/${verse}`.
- The translation ID is part of the key so the same reference can be saved from multiple translations.
- Client route guards are user-experience controls, not security boundaries.
- `database.rules.json` requires `auth.uid` to match the root user ID. Keep those rules aligned with the favorite path and deploy rule changes to Firebase.
- Never commit `.env` files or expose non-public secrets. Firebase web configuration uses `NEXT_PUBLIC_*`, but administrative credentials must never use that pattern.

## Breadcrumb Rules

- Breadcrumb labels should be uppercased in the UI.
- The root breadcrumb label is `SCRIPTURE`.
- Keep breadcrumb paths unchanged unless the user explicitly requests a route change.
- On the verse page, breadcrumb labels should stay in sync with the selected verse.
- Breadcrumb text is semibold, and the final item is the active item with `aria-current="page"` and the theme accent.
- In the navbar, Scripture is active for `/` and every translation/book/chapter route. Favorites is active only for the Favorites route; auth routes leave both content links inactive.

## Theme and Styling Rules

The app theme uses a lavender accent:

- `#ceccff`

This color is centralized through shared CSS variables and helper classes in `app/globals.css`. When styling new UI:

- prefer the existing theme utility classes
- keep hover, active, and focus states aligned with the lavender palette
- avoid reintroducing the old yellow/gold accent
- keep typography readable and compact where verses or chapter numbers can run long

## Carousel and Gallery Rules

- Use Embla for swipers.
- Keep carousel components reusable.
- `BookCarousel` shows and moves 2 items on mobile, 3 on tablet, and 4 on desktop.
- `VerseSwiperGallery` shows and moves 6 items on mobile, 8 on tablet, and 12 on desktop.
- Show fallback states when content is empty instead of rendering broken layouts.
- Preserve accessible arrow labels, disabled states, and pointer cursors.

## Animation Rules

- `TransitionLayout` and `SmootherContainer` provide the global GSAP entrance and smooth-scroll behavior. Do not add another global smooth-scroll wrapper.
- Use the existing `AnimPanning` component for matching section reveals instead of registering GSAP plugins in individual page components.
- Avoid creating a ScrollTrigger for every item in a large API-backed list unless the visual result justifies the client cost.
- Keep GSAP effects on transform and opacity where possible, and ensure effects and triggers are cleaned up through `useGSAP` or explicit teardown.
- The entrance overlay affects perceived loading time. Do not increase its duration without browser performance verification.
- When changing animation behavior, test navigation, scroll restoration, mobile menu scroll locking, and reduced-motion accessibility.

## Verse Page Rules

The verse page acts like a projector:

- the selected verse text is shown prominently
- the verse reference updates when the swiper selection changes
- the hero should remain stable even for long verses
- scrolling should happen inside the verse text area when needed

## Accessibility Rules

- Use semantic landmarks and headings where appropriate.
- Preserve visible focus states.
- Ensure cards and carousel items remain tappable on mobile.
- Do not rely on color alone to convey state.
- Keep text legible on mobile, tablet, and desktop.
- Use `aria-current="page"` for active navigation and breadcrumb items.
- Full-screen menus must have an accessible toggle label, `aria-expanded`, `aria-controls`, Escape-key support, and scroll-lock cleanup.
- Respect disabled cursor states and keep enabled buttons and calls to action visibly interactive.

## Verification

Before finishing changes, run:

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build` for deployment-sensitive, routing, Firebase, or structural changes

If a change affects layout or interaction, verify it in the browser at relevant mobile and desktop breakpoints. For authentication changes, test signed-in and signed-out behavior when credentials are available.

The production build currently emits a known `metadataBase` warning. Do not mistake it for a TypeScript or route failure, but resolve it when the deployment origin is available.

## Practical Editing Guidance

- Prefer `apply_patch` for file edits.
- Do not overwrite unrelated user changes.
- Avoid large structural rewrites unless the task explicitly asks for them.
- If a fallback or layout edge case can happen, handle it in the component rather than assuming the API always returns data.
- Remove unused placeholder components and commented-out implementation blocks instead of keeping dead alternatives in the repository.
- Preserve user changes in the dirty worktree and do not revert unrelated files.
