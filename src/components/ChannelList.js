import React from 'react';
import './ChannelList.css';

const ChannelList = ({ channels, onSelect }) => {
  return (
    <div className="channel-list">
      {channels.map((channel, index) => (
        <div
          key={index}
          className="channel-list-item"
          onClick={() => onSelect(channel)}
        >
          <img src={channel.logo} alt={channel.title} />
          <span>{channel.title}</span>
        </div>
      ))}
    </div>
  );
};

export default ChannelList;
