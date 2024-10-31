import axios from 'axios';

const playlistUrl = 'http://localhost/jiotv-be/playlist.php';

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

  lines.forEach(line => {
    if (line.startsWith('#EXTINF')) {
      // Adjust regex to capture tvg-id, tvg-logo, group-title, title, and URL on the same line
      const channelInfo = line.match(/#EXTINF:-1 tvg-id="(.+?)" tvg-logo="(.+?)" group-title="(.+?)",(.+?) (http.+)/);
      if (channelInfo) {
        const [, tvgId, tvgLogo, groupTitle, title, url] = channelInfo;

        const currentChannel = {
          tvgId: tvgId.trim(),
          tvgLogo: tvgLogo.trim(),
          groupTitle: groupTitle.trim(),
          title: title.trim(),
          url: url.trim(),
        };

        channels.push(currentChannel);
      }
    }
  });

  return channels;
};

export default fetchPlaylist;
