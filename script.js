// Folder: script.js


// Fetch our personal suggested songs (Fetch 1)
fetch('http://localhost:3001/api/tracks-from-db')
  .then(res => res.json())
  .then(data => {
    const suggestions = document.getElementById('suggestions');

    if (!suggestions) {
      console.error("Suggestions container not found");
      return;
    }

    suggestions.innerHTML = '';

    data.forEach(track => {
      const div = document.createElement('div');
      div.className = 'song-card';

      div.innerHTML = `
        <img src="${track.album_art_url}" alt="${track.title}" />
        <p><strong>${track.title}</strong></p>
        <p>${track.artist}</p>
        <button class="save-btn">Save</button>
      `;

      const button = div.querySelector('.save-btn');
      button.addEventListener('click', () => saveToSupabase(track));

      suggestions.appendChild(div);
      button.addEventListener('click', () => {
        let saved = JSON.parse(localStorage.getItem('mySongs')) || [];
        saved.push(track);
        localStorage.setItem('mySongs', JSON.stringify(saved));
        alert(`Saved "${track.title}" to your songs`);
      });
      
    });
  })
  .catch(err => console.error('Fetch error:', err));

  // Fetch trending songs from Spotify API
fetch('http://localhost:3001/api/spotify/search?q=pop&type=track')
.then(res => {
  console.log("Trending fetch succeeded");
  return res.json();
})
.then(data => {
  const trending = document.getElementById('trending');
  if (!trending) {
    console.error("Trending container not found");
    return;
  }

  trending.innerHTML = '';

  data.tracks.items.slice(0, 6).forEach(track => {
    const div = document.createElement('div');
    div.className = 'song-card';

    div.innerHTML = `
      <img src="${track.album.images[0]?.url || 'https://via.placeholder.com/160'}" />
      <p><strong>${track.name}</strong></p>
      <p>${track.artists.map(a => a.name).join(', ')}</p>
    `;

    trending.appendChild(div);
  });
})
.catch(err => console.error('Trending fetch error:', err));



  function saveToSupabase(track) {
  fetch('http://localhost:3001/api/spotify/save-favorite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ track })
  })
  .then(res => res.json())
  .then(response => {
    if (response.success) {
      alert('Track saved!');
    } else {
      alert('Failed to save.');
    }
  })
  .catch(err => console.error('Error saving:', err));
}

// 




// Fetch artist row (Fetch 3)
fetch('http://localhost:3001/api/spotify/search?q=rap&type=artist')
  .then(res => res.json())
  .then(data => {
    const artists = document.getElementById('artists');
    data.artists.items.slice(0, 6).forEach(artist => {
      const div = document.createElement('div');
      div.className = 'artist-circle';
      div.innerHTML = `
        <img src="${artist.images[0]?.url || 'https://via.placeholder.com/100'}" alt="${artist.name}" />
        <p>${artist.name}</p>`;
      artists.appendChild(div);
      console.log(artist);

    });
  });

  



// Fetch genre data and show with Chart.js (Fetch 4)
fetch('http://localhost:3001/api/spotify/search?q=hiphop')
  .then(res => res.json())
  .then(data => {
    const genres = data.artists.items.map(a => a.genres[0] || 'Other');
    const counts = genres.reduce((acc, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {});

    const ctx = document.getElementById('genreChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(counts),
        datasets: [{
          label: 'Genre Breakdown',
          data: Object.values(counts),
          backgroundColor: '#1DB954'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#fff' },
          },
          x: {
            ticks: { color: '#fff' },
          }
        },
        plugins: {
          legend: { labels: { color: '#fff' } }
        }
      }
    });
  });


  // Example Save Playlist button handler
  window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('savePlaylistBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        window.addEventListener('DOMContentLoaded', () => {
          const btn = document.getElementById('savePlaylistBtn');
          const mySongs = JSON.parse(localStorage.getItem('mySongs')) || [];
        
          if (btn) {
            btn.addEventListener('click', () => {
              if (mySongs.length === 0) {
                alert("No songs to save.");
                return;
              }
        
              fetch('http://localhost:3001/api/save-playlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name: "My Chill Mix",
                  user_id: "user123",
                  tracks: mySongs
                })
              })
              .then(res => res.json())
              .then(data => {
                console.log('Playlist saved:', data);
                alert('Playlist saved successfully!');
              })
              .catch(err => console.error('Save error:', err));
            });
          }
        });
        
        fetch('http://localhost:3001/api/save-playlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sampleData)
        })
          .then(res => res.json())
          .then(data => {
            console.log('Playlist saved:', data);
            alert('Playlist saved successfully!');
          })
          .catch(err => console.error('Save error:', err));
      });
    }
  
  
 
  

});

function saveToFavorites(track) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push(track);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}





