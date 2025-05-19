// Folder: script.js


// Fetch new songs (Fetch 1)
fetch('http://localhost:3001/api/spotify/search?q=hiphop')
  .then(res => res.json())
  .then(data => {
    const trending = document.getElementById('trending');
    data.artists.items.slice(0, 6).forEach(artist => {
      const div = document.createElement('div');
      div.className = 'song-card';
      div.innerHTML = `<img src="${artist.images[0]?.url || 'https://via.placeholder.com/160'}"/><p>${artist.name}</p>`;
      trending.appendChild(div);
    });
    new 
    (document.querySelector('.glider'), {
      slidesToShow: 3,
      draggable: true,
      scrollLock: true
    });
  });

// Fetch artist row (Fetch 2)
fetch('http://localhost:3001/api/spotify/search?q=rap')
  .then(res => res.json())
  .then(data => {
    const artists = document.getElementById('artists');
    data.artists.items.slice(0, 6).forEach(artist => {
      const div = document.createElement('div');
      div.className = 'artist-circle';
      div.innerHTML = `<img src="${artist.images[0]?.url || 'https://via.placeholder.com/100'}" alt="${artist.name}" />`;
      artists.appendChild(div);
    });
  });

// Fetch genre data and show with Chart.js (Fetch 3)
fetch('http://localhost:3001/api/spotify/search?q=edm')
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

  fetch('http://localhost:3001/api/tracks-from-db')
  .then(res => res.json())
  .then(data => {
    const trendingDiv = document.getElementById('trending');
    data.forEach(track => {
      const card = document.createElement('div');
      card.className = 'song-card';
      card.innerHTML = `
        <img src="${track.album_art_url}" alt="${track.title}" />
        <p>${track.title}</p>
        <small>${track.artist}</small>
      `;
      trendingDiv.appendChild(card);
    });
  })
  .catch(err => console.error('Fetch error:', err));

  // Example Save Playlist button handler
  window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('savePlaylistBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        const sampleData = {
          name: "My Chill Mix",
          user_id: "user123",
          track_ids: ["track-1", "track-2", "track-3"]
        };
  
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
  
  
  const sampleData = {
    name: "My Chill Mix",
    user_id: "user123",
    track_ids: ["track-1", "track-2", "track-3"]
  };
  window.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3001/api/spotify/search?q=pop')
      .then(res => res.json())
      .then(data => {
        const gliderContainer = document.getElementById('glider-trending');
  
        data.artists.items.slice(0, 6).forEach(artist => {
          const div = document.createElement('div');
          div.className = 'song-card';
          div.innerHTML = `
            <img src="${artist.images[0]?.url || 'https://via.placeholder.com/160'}" />
            <p>${artist.name}</p>`;
          gliderContainer.appendChild(div);
        });
  
        new Glider(gliderContainer, {
          slidesToShow: 3,
          slidesToScroll: 1,
          draggable: true,
          dots: '.dots',
          arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
          }
        });
      });
  });
  

});

  
