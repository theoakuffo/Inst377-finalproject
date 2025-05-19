# Spotify Music Recommender

## Description

Spotify Music Recommender is a web application that helps users discover new music using the Spotify API. It allows users to view trending songs, see popular artists, and build their own custom playlists from suggested tracks. Users can save tracks, review them on the playlist page, and commit their final playlist to a backend database (Supabase).

## Target Browsers

The application is designed to work on all modern browsers. It has been tested on:

- Google Chrome (Desktop, Android)
- Safari (iOS)
- Microsoft Edge
- Firefox

Responsive layout ensures compatibility across mobile and desktop platforms.

## Developer Manual

_The rest of this README is intended for developers looking to maintain or extend the project._

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone <https://github.com/theoakuffo/Inst377-finalproject>
cd <Inst377-finalproject>
```

### 2. Install server dependencies

```bash
cd server
npm install
```

### 3. Create a `.env` file in `/server/` with your Spotify and Supabase credentials:

```env
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_or_service_key
```

---

## How to Run

From the `/server/` directory:

```bash
node server.js
```

Then open `index.html` in your browser (served locally or via a live server extension).

The app will fetch data from:

- Spotify Web API (via your backend)
- Supabase Database (for playlists and stored suggestions)

---

## Testing

There is no automated test suite, but you can manually verify:

- The home page loads suggested songs and popular artists
- Clicking “Save” adds a song to localStorage
- Saved songs appear on the Playlist page
- Clicking “Save Example Playlist” writes the playlist to Supabase
- Artist and genre sections fetch and display using Spotify API
- Inspect the network tab for failed API calls or Supabase errors

---

## API Endpoints

Defined in `server/routes/api.js`

### `GET /api/spotify/search?q=<query>&type=<type>`

- Description: Proxies requests to Spotify’s search endpoint for artists/tracks

### `GET /api/tracks-from-db`

- Description: Returns predefined suggested songs from Supabase or mock database

### `POST /api/save-playlist`

- Body: `{ name, user_id, tracks }`
- Description: Inserts a new playlist record and related tracks into Supabase

### `GET /api/spotify/get-token`

- Description: Manually fetches a new access token using the client credentials flow

---

## Known Issues

- Spotify access tokens expire every 3600 seconds; token refresh must stay enabled
- Duplicate songs may appear if saved multiple times (no deduping)
- All users are defaulted to `"user123"` with no authentication logic
- Artist and genre sections silently fail if Spotify returns an unexpected shape
- Spotify API tends to go down

---

## Future Roadmap

- Add authentication so users can log in and manage their own playlists
- Let users name and delete playlists
- Visual enhancements (loading spinners, toast notifications)
