const axios = require('axios');

const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

router.get('/spotify/search', async (req, res) => {
  const query = req.query.q || 'pop';

  try {
    // 1. Get access token
    const tokenRes = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'client_credentials' }),
      {
        headers: {
          Authorization: 'Basic ' + Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const token = tokenRes.data.access_token;

    // 2. Use token to search Spotify
    const searchRes = await axios.get(
      'https://api.spotify.com/v1/search',
      {
        headers: { Authorization: 'Bearer ' + token },
        params: { q: query, type: 'artist', limit: 10 }
      }
    );

    res.json(searchRes.data);
  } catch (err) {
    console.error('Spotify error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch from Spotify' });
  }
});


// GET: retrieve tracks
router.get('/tracks-from-db', async (req, res) => {
  const { data, error } = await supabase.from('tracks').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/save-playlist', async (req, res) => {
  const { name, user_id, tracks } = req.body;

  if (!name || !user_id || !tracks || !Array.isArray(tracks) || tracks.length === 0) {
    return res.status(400).json({ error: 'Invalid playlist data' });
  }

  // Step 1: Insert the playlist
  const { data: playlistData, error: playlistError } = await supabase
    .from('playlists')
    .insert([{ name, user_id }])
    .select()
    .single();

  if (playlistError) {
    console.error('Playlist insert error:', playlistError);
    return res.status(500).json({ error: playlistError.message });
  }

  const playlist_id = playlistData.id;

  // Step 2: Insert all tracks associated with the playlist
  const trackRecords = tracks.map(track => ({
    playlist_id,
    title: track.title,
    artist: track.artist,
    album_art_url: track.album_art_url || ''
  }));

  const { error: tracksError } = await supabase
    .from('playlist_tracks')
    .insert(trackRecords);

  if (tracksError) {
    console.error('Track insert error:', tracksError);
    return res.status(500).json({ error: tracksError.message });
  }

  res.json({ success: true, playlist_id });
});


module.exports = router;

router.get('/spotify/get-token', async (req, res) => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'client_credentials' }),
      {
        headers: {
          Authorization: 'Basic ' + Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    res.json(response.data); // returns access_token, token_type, expires_in
  } catch (err) {
    console.error('Token fetch failed:', err.response?.data || err.message);
    res.status(500).json({ error: 'Token fetch failed' });
  }
});


