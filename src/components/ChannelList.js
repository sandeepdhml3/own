import React from 'react';

const ChannelList = ({ channels, onSelect }) => {
  return (
    <div className="channel-list">
      {channels.map(channel => (
        <div
          <img src={channel.logo} alt={channel.title} />
          <div className="channel-title">{channel.title}</div>
        </div>
      ))}
    </div>
  );
};

export default ChannelList;

