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
  let currentChannel = {};

  lines.forEach((line) => {
    // Check for channel info
    if (line.startsWith('#EXTINF')) {
      // Adjust regex to capture tvg-id, tvg-logo, group-title, title
      const channelInfo = line.match(/#EXTINF:-1 tvg-id="(.+?)" tvg-logo="(.+?)" group-title="(.+?)",(.+)/);
      if (channelInfo) {
        const [, tvgId, tvgLogo, groupTitle, title] = channelInfo;

        // Create a new channel object with the captured details
        currentChannel = {
          tvgId: tvgId.trim(),
          tvgLogo: tvgLogo.trim(),
          groupTitle: groupTitle.trim(),
          title: title.trim(),
          url: '', // Initialize URL to be populated in the next line
        };
      }
    }

    // Check for the URL line
    if (line.startsWith('http')) {
      // If the line starts with 'http', set the URL for the current channel
      if (currentChannel) {
        currentChannel.url = line.trim();
        channels.push(currentChannel); // Add the channel to the list
        currentChannel = {}; // Reset currentChannel for the next channel
      }
    }
  });

  return channels;
};

export default fetchPlaylist;
