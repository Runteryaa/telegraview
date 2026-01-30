# Project Blueprint: Webtoon Proxy Viewer

## Overview
A Next.js application designed to proxy and display Telegra.ph articles in a vertical, "Webtoon-style" scrolling format. The app scrapes content server-side to avoid CORS issues and presents a seamless reading experience on the client.

## Current Plan: Implement Core Features

### Goal
Create a functional viewer for Telegra.ph content with a landing page and a dedicated viewer route.

### Steps
1.  **Dependencies**: Install `cheerio` for HTML parsing and `lucide-react` for icons.
2.  **API Route (`src/app/api/read/route.ts`)**: 
    -   Create a GET endpoint that accepts a `url` query parameter.
    -   Fetch and parse the Telegra.ph page.
    -   Extract the title and image URLs (fixing relative paths).
    -   Return JSON data.
3.  **Viewer Page (`src/app/view/page.tsx`)**:
    -   Client Component using `useSearchParams`.
    -   Fetch data from the API.
    -   Render images in a seamless vertical stack.
    -   Implement "Ad Placeholder" locations.
4.  **Home Page (`src/app/page.tsx`)**:
    -   Create a dark-themed landing page.
    -   Input field for Telegra.ph URL.
    -   Redirect logic to the viewer page.
5.  **Styling**: Ensure full-width images, dark mode, and mobile responsiveness using Tailwind CSS.
