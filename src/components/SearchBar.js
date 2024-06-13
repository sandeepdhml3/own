// src/components/ChannelList.js

import React from 'react';

const ChannelList = ({ channels, setSelectedChannel }) => {
  return (
    <div className="channel-list">
      {channels.map(channel => (
        <div key={channel.id} className="channel-item" onClick={() => setSelectedChannel(channel)}>
          <img src={channel.logo} alt={channel.title} />
          <p>{channel.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ChannelList;
