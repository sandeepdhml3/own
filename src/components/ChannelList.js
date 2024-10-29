import React from 'react';

const ChannelList = ({ channels, onSelect }) => {
  return (
    <div className="channel-list">
      {channels.map((channel, index) => (
        <div
          key={channel.tvgId || index} // Use tvgId as a key if available, otherwise fallback to index
          className="channel-item"
          onClick={() => onSelect(channel)}
        >
          <img
            src={channel.tvgLogo || 'https://via.placeholder.com/50'} // Fallback image if tvgLogo is missing
            alt={channel.title || 'Channel Image'}
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

