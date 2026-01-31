# Project Blueprint: Webtoon Proxy Viewer

## Overview
A Next.js application designed to proxy and display Telegra.ph articles in a vertical, "Webtoon-style" scrolling format. The app scrapes content server-side to avoid CORS issues and presents a seamless reading experience on the client.

## Current Plan: Implement Core Features

### Goal
Create a functional viewer for Telegra.ph content with a landing page and a dedicated viewer route.

### Steps
1.  **Dependencies**: Install `cheerio` for HTML parsing, `lucide-react` for icons, and `disqus-react` for comments.
2.  **API Route (`src/app/api/read/route.ts`)**: 
    -   Create a GET endpoint that accepts a `url` query parameter.
    -   Fetch and parse the Telegra.ph page.
    -   Extract the title and image URLs (fixing relative paths).
    -   Return JSON data.
3.  **API Route (`src/app/api/shorten/route.ts`)**:
    -   Create a GET endpoint to shorten URLs using the `exe.io` API.
    -   Accepts `url` query parameter.
    -   Returns the shortened URL for monetization.
4.  **Viewer Page (`src/app/view/page.tsx`)**:
    -   Client Component using `useSearchParams`.
    -   Fetch content data from `/api/read`.
    -   Fetch shortened URL from `/api/shorten`.
    -   Render images in a seamless vertical stack.
    -   Implement "Ad Placeholder" locations.
    -   Ensure ad close buttons are always visible on mobile (< lg screens) and hover-only on desktop.
    -   Add Home button in the header and make the title a clickable link to the **shortened** original content (monetized).
    -   **New**: Integrate **Disqus** comments section using the `disqus-react` package.
5.  **Home Page (`src/app/page.tsx`)**:
    -   Create a dark-themed landing page.
    -   Input field for Telegra.ph URL.
    -   Redirect logic to the viewer page.
6.  **Styling**: Ensure full-width images, dark mode, and mobile responsiveness using Tailwind CSS.

## Recent Updates
-   **Comments**: Refactored the Disqus component to use the `disqus-react` library for better stability and feature support. A placeholder shortname `telegraph-viewer-demo` is used; the user should update this in `src/app/view/Disqus.tsx`.
-   **Monetization**: Added integration with `exe.io` to shorten the original article URL.
-   **Navigation & Links**: Updated `src/app/view/page.tsx` to include a "Home" button in the header.
-   **Ad Visibility**: Updated `src/app/view/page.tsx` to make close buttons for inline ads always visible on mobile devices.