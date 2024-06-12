import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ src, poster, width = '100%', height = 'auto' }) => {
  return (
    <div className="video-player-wrapper">
      <ReactPlayer
        url={src}
        playing={false}
        controls={true}
        width={width}
        height={height}
        light={poster}
      />
    </div>
  );
};

export default VideoPlayer;
