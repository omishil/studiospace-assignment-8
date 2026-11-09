# StudioSpace

**StudioSpace** is a peer-to-peer creative workspace and production studio marketplace for photographers, filmmakers, podcasters, musicians, and workshop hosts. Studio owners list their spaces, and creators discover, compare, and book them with transparent hourly pricing and real-time booking management.

## Live Site

**Live URL:** https://studiospace-hazel.vercel.app/

**Client Repository:** https://github.com/omishil/studiospace-assignment-8.git  
**Server Repository:** https://github.com/omishil/studiospace-server-.git

## Features

- **Curated studio marketplace** — browse Photo Studios, Sound Stages, Podcast Rooms, Music Suites, and Art Workshops from a single grid.
- **Hero slider** — three interactive Swiper slides with animated headlines, imagery, and Explore / Host calls to action.
- **Featured studios** — the six top-rated spaces fetched dynamically from MongoDB and rendered as equal-height cards with rating, category, location, and hourly rate.
- **Category filtering** — category cards on the home page and the footer's Popular Categories deep-link to `/studios?category=...` with the filter pre-selected.
- **Full studio CRUD** — hosts can add, update, and delete listings from dedicated private pages, including gallery images, amenities, capacity, security deposit, and host details.
- **Secure authentication** — email/password and Google social login via BetterAuth, with JWT-protected server mutations and private-route protection.
- **Booking system** — reservations are saved with a `Pending` status; the My Bookings page shows status badges (Pending, Confirmed, Completed, Cancelled) and lets creators cancel pending slots.
- **Wishlist / favorites** — signed-in creators can save studios from any listing card and review them on a dedicated Wishlist page.
- **Host & creator dashboard** — a private `/dashboard` with quick actions plus a summary of the user's listings and bookings.
- **Double-booking prevention** — the API rejects overlapping reservations before saving a new one.
- **Dark / light theme** — a full-system theme toggle with persisted preference and toast-aware theming.
- **Polished UX** — Sonner toast notifications, branded skeleton loaders and spinners, custom 404 page with studio illustration, and friendly empty states with CTAs.
- **Responsive design** — optimized layouts for mobile, tablet, and desktop, with a sticky navbar featuring active-route indicators and a footer that collapses its link groups on small screens.
- **Newsletter signup, footer navigation, and X (Twitter) rebrand logo** — consistent branding across every route.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS v4, shadcn-style UI primitives, Base UI |
| Authentication | BetterAuth with MongoDB adapter, Google OAuth, JWT plugin |
| Client data | MongoDB Node.js driver (server-side), REST API |
| Backend | Express.js 5, MongoDB, JWT verification via `jose` and JWKS |
| Notifications | Sonner |
| Carousel | Swiper.js |
| Theming | `next-themes` |
| Icons | Lucide React |
| Image uploads | ImgBB API |
| Deployment | Vercel (client) / Render (server) |

## Local Setup

### Prerequisites

- Node.js 20.9+
- npm
- A MongoDB Atlas connection string
- Google OAuth credentials (optional, for social login)
- An ImgBB API key (for server-side image uploads)

### 1. Clone both repositories

```bash
git clone https://github.com/omishil/studiospace-assignment-8.git studiospace
git clone https://github.com/omishil/studiospace-server-.git studiospace-server
```

### 2. Start the API server

```bash
cd studiospace-server
npm install
```

Create `.env`:

```env
MONGODB_URL=your_mongodb_connection_string
IMGBB_API_KEY=your_imgbb_api_key
```

```bash
node index.js
```

The API runs at `http://localhost:5000`.

### 3. Start the client

```bash
cd studiospace
npm install
```

Create `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URL=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

`NEXT_PUBLIC_API_URL` must point at the running API server; when deploying the client, set it to the deployed server URL.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Production build

```bash
npm run build
npm start
```

## Examiner Test Credentials

**Email:** `omi@gmail.com`  
**Password:** `11111111Aa`

This account owns 7 studio listings and has booking history, so My Listings, My Bookings, and the Dashboard are populated. Existing bookings are all in `Cancelled` status — create a new booking to see the `Pending` flow.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create an optimized production build |
| `npm start` | Run the production build |
| `npm run lint` | Lint the project with ESLint |

## Notes

- The server runs on port `5000` in development; set `NEXT_PUBLIC_API_URL=http://localhost:5000` so the client can reach it.
- Studio details and booking pages are public or session-protected as appropriate; private routes never redirect a logged-in user back to Login on reload.
- Email verification and password reset are intentionally disabled to keep examiner testing simple.
