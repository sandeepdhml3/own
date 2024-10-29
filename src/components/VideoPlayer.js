import React from 'react';
import ReactPlayer from 'react-player';

import './VideoPlayer.css'; // Import the CSS file


const VideoPlayer = ({ src, poster, width = '100%', height = 'auto', channelName }) => {
  return (
    <div className="video-player-wrapper">
      <ReactPlayer
        url={src}
        playing={true} // Auto-play on load
        controls={true}
        width={width}
        height={height}
        light={poster}
      />
      {channelName && (
        <div className="video-overlay">
          <span className="video-channel-name">{channelName}</span>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
