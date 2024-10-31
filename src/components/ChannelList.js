import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type-checking
import './ChannelList.css'; // Import the CSS file

const ChannelList = ({ channels, onSelect }) => {
  const [activeChannelId, setActiveChannelId] = useState(null); // Track active channel by ID

  const handleSelect = (channel) => {
    setActiveChannelId(channel.tvgId); // Use tvgId for tracking active channel
    onSelect(channel); // Pass the channel to parent for playing in video player
  };

  return (
    <div className="channel-list">
      {channels.map((channel) => (
        <div
          key={channel.tvgId}
          className={`channel-list-item ${activeChannelId === channel.tvgId ? 'active' : ''}`}
          onClick={() => handleSelect(channel)}
          role="button" // Accessibility feature
          tabIndex={0} // Make the item focusable
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSelect(channel); // Select channel on Enter key press
            }
          }}
        >
          <img
            src={channel.tvgLogo || 'https://via.placeholder.com/50'}
            alt={channel.title || 'Channel logo'}
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

// Define prop types for the component
ChannelList.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      tvgId: PropTypes.string.isRequired,
      tvgLogo: PropTypes.string,
      groupTitle: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ChannelList;
