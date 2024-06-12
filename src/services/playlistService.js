import axios from 'axios';

const playlistUrl = 'https://iptv-org.github.io/iptv/countries/in.m3u';

const fetchPlaylist = async () => {
  try {
    const response = await axios.get(playlistUrl);
    const channels = parsePlaylist(response.data);
    const validChannels = await validateChannels(channels);
    return validChannels;
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
      const channelInfo = line.match(/#EXTINF:-1 tvg-id="(.+?)" tvg-logo="(.+?)" group-title="(.+?)",(.+)/);
      if (channelInfo) {
        currentChannel = {
          id: channelInfo[1],
          logo: channelInfo[2],
          group: channelInfo[3],
          title: channelInfo[4],
        };
      }
    } else if (line.startsWith('http') || line.startsWith('https')) {
      currentChannel.url = line;
      channels.push(currentChannel);
      currentChannel = {};
    }
  });

  return channels;
};

const validateChannels = async (channels) => {
  const validChannels = [];
  for (const channel of channels) {
    const isValid = await checkUrl(channel.url);
    if (isValid) {
      validChannels.push(channel);
    } else {
      channel.url = 'Unavailable right now, will be updated soon';
      validChannels.push(channel);
    }
  }
  return validChannels;
};

const checkUrl = async (url) => {
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch (error) {
    console.error(`Error checking URL ${url}:`, error);
    return false;
  }
};

export default fetchPlaylist;
