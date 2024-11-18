import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

// Load the YouTube IFrame API
const loadYouTubeAPI = () => {
  const script = document.createElement('script');
  script.src = 'https://www.youtube.com/iframe_api';
  script.async = true;
  document.body.appendChild(script);
};

const NaatAudioButton = () => {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const playlist = [
    'tpCsw_Oth9I', // Ahmad Pirzada's Naat
    '8mHV8ay9k-U' // Add more YouTube video IDs here as needed
  ];

  useEffect(() => {
    loadYouTubeAPI();

    // Initialize the YouTube player when the API is ready
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player('youtube-player', {
        videoId: playlist[currentVideoIndex], // Start with the first video in the playlist
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(100); // Set volume to a low background level
            setPlayer(event.target);
          },
          onStateChange: (event) => handleStateChange(event)
        },
      });
    };
  }, [currentVideoIndex]);

  const handleStateChange = (event) => {
    // Move to the next video in the playlist when the current one ends
    if (event.data === window.YT.PlayerState.ENDED) {
      const nextIndex = (currentVideoIndex + 1) % playlist.length;
      setCurrentVideoIndex(nextIndex);
      player.loadVideoById(playlist[nextIndex]);
      if (!isPlaying) player.pauseVideo(); // Keep paused if not playing
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
      player.setVolume(5); // Reset volume each time it plays to maintain low background level
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Hidden YouTube Player */}
      <div id="youtube-player" style={{ display: 'none' }}></div>

      {/* Play/Pause Button */}
      <IconButton
        onClick={toggleAudio}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 1000,
          backgroundColor: 'rgba(0, 78, 140, 0.7)', // Slight transparency for subtlety
          color: '#FFFFFF',
          padding: '10px', // Smaller button
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'opacity 0.3s ease', // Smooth fade on play/pause
          opacity: isPlaying ? 1 : 0.8, // Lower opacity when paused
        }}
      >
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
    </>
  );
};

export default NaatAudioButton;
