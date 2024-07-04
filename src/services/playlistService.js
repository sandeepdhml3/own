import axios from 'axios';

const playlistUrl = 'https://amitb3669.github.io/tataplay6.m3u';

export const fetchPlaylist = async () => {
  try {
    const response = await axios.get(playlistUrl);
    return parsePlaylist(response.data);
  } catch (error) {
    console.error('Error fetching the playlist:', error);
    return [];
  }
};

const parsePlaylist = (data) => {
  const lines = data.split('\n');
  const channels = [];
  let currentChannel = {};

  lines.forEach(line => {
    if (line.startsWith('#EXTINF')) {
      const channelInfo = line.match(/#EXTINF:-1 tvg-id="(.+?)" group-title="(.+?)", tvg-logo="(.+?)",(.+)/);
      if (channelInfo) {
        currentChannel = {
          id: channelInfo[1],
          logo: channelInfo[3],
          group: channelInfo[2],
          title: channelInfo[4],
        };
      }
    } else if (line.startsWith('http') && currentChannel.id) {
      currentChannel.url = line;
      channels.push(currentChannel);
      currentChannel = {};
    }
  });

  return channels;
};
