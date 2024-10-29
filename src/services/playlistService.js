import axios from 'axios';

const playlistUrl = 'https://m3u.ch/pl/d2629832a9bc61b18ed3ff4c4594861c_4d0e3ead030c975b02d6349295b035e0.m3u';

const fetchPlaylist = async () => {
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
      // Update regex to match the new format with tvg-id, tvg-logo, and group-title
      const channelInfo = line.match(/#EXTINF:-1 tvg-id="(.+?)" tvg-logo="(.+?)" group-title="(.+?)",(.+)/);
      if (channelInfo) {
        const [, tvgId, tvgLogo, groupTitle, title] = channelInfo;
        
        currentChannel = {
          tvgId: tvgId.trim(),
          tvgLogo: tvgLogo.trim(),
          groupTitle: groupTitle.trim(),
          title: title.trim(),
        };
      }
    } else if (line.startsWith('http') && currentChannel.title) {
      currentChannel.url = line.trim();
      channels.push(currentChannel);
      currentChannel = {};
    }
  });

  return channels;
};

export default fetchPlaylist;
