# Infinite Verse Agent Guide

## Project Overview
Infinite Verse is a Next.js app for browsing Bible translations, books, chapters, and verses. The experience is built around a calm reading flow with:

- a shared top navbar
- hero sections on most pages
- breadcrumb navigation
- translation, book, chapter, and verse browsing
- reusable gallery and carousel components

This project is intentionally simple and readable. Prefer small, focused components over clever abstractions.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- GSAP for page transitions and motion
- Embla Carousel for swipers

## Important App Layout Rules

- The navbar is fixed at the top in `app/components/layout/Navbar.tsx`.
- The app shell in `app/layout.tsx` already includes the navbar and the global transition wrapper.
- `app/components/gsap/TransitionLayout.tsx` contains the spacer that keeps page content from sliding under the fixed navbar.
- Do not replace the spacer with page-level padding unless the whole shell is being redesigned.
- Use the shared hero pattern where possible so pages feel uniform.

## Page Structure

The app follows the route hierarchy below:

- `/` home page
- `/[translationId]` translation page
- `/[translationId]/[bookId]` chapter grid page
- `/[translationId]/[bookId]/[chapter]` verse page

General page flow:

1. hero section
2. breadcrumbs
3. main content

The verse route is the exception in that the verse projector leads the page and the breadcrumb placement follows that experience.

## Component Conventions

Prefer reusable components that are easy to compose:

- `PageHero` for shared 40vh hero sections
- `BookCarousel` for reusable book swipers
- `TranslationGallery` for translation cards
- `ChapterGrid` for chapter tiles
- `VerseHero` and `VerseSwiperGallery` for the verse projector flow

When adding new UI:

- keep props small and explicit
- pass data down instead of duplicating fetch logic
- preserve existing responsive behavior
- keep interactive pieces accessible with keyboard and semantic HTML

## Data and API Rules

Bible data is sourced from `https://bible-api.com/data/...`.

Current endpoint patterns:

- random verse: `https://bible-api.com/data/[translation]/random`
- translations: `https://bible-api.com/data/`
- books: `https://bible-api.com/data/[translationId]`
- chapters: `https://bible-api.com/data/[translationId]/[bookId]/[chapter]`
- verse: `https://bible-api.com/data/[translationId]/[bookId]/[chapter]`

When working with API data:

- define explicit TypeScript types for response shapes
- handle missing or empty arrays with safe fallbacks
- keep response mapping close to the page or data helper that uses it
- preserve book order from the source data unless the user asks otherwise

## Breadcrumb Rules

- Breadcrumb labels should be uppercased in the UI.
- Home should use `BIBLE` instead of `TRANSLATIONS`.
- Keep breadcrumb paths unchanged unless the user explicitly requests a route change.
- On the verse page, breadcrumb labels should stay in sync with the selected verse.

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
- Respect responsive item counts already established in the UI.
- Show fallback states when content is empty instead of rendering broken layouts.

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

## Verification

Before finishing changes, run:

- `npm run lint`

If a change affects layout, verify it in the browser and check responsive behavior.

## Practical Editing Guidance

- Prefer `apply_patch` for file edits.
- Do not overwrite unrelated user changes.
- Avoid large structural rewrites unless the task explicitly asks for them.
- If a fallback or layout edge case can happen, handle it in the component rather than assuming the API always returns data.

