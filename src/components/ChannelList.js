import React, { useState } from 'react';
import './ChannelList.css'; // Import the CSS file

const ChannelList = ({ channels, onSelect }) => {
  const [activeChannel, setActiveChannel] = useState(null);

  const handleSelect = (channel) => {
    setActiveChannel(channel); // Track the active channel
    onSelect(channel); // Pass the channel to parent for playing in video player
  };

  return (
    <div className="channel-list">
      {channels.map((channel, index) => (
        <div
          key={channel.tvgId || index}
          className={`channel-list-item ${activeChannel === channel ? 'active' : ''}`}
          onClick={() => handleSelect(channel)}
        >
          <img
            src={channel.tvgLogo || 'https://via.placeholder.com/50'}
            alt={channel.title}
            className="channel-logo"
          />
          <div className="channel-info">
            <div className="channel-title">{channel.title || 'Untitled Channel'}</div>
            <div className="channel-group">Group: {channel.groupTitle || 'Unknown'}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChannelList;
