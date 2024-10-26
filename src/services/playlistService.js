import axios from 'axios';

const playlistUrl = 'http://31.43.191.49:25461/get.php?username=richard&password=8sYDdCLMazvM&type=m3u';

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
      // Update regex to match the new format
      const channelInfo = line.match(/#EXTINF:-1,(.+)/);
      if (channelInfo) {
        const titleAndGroup = channelInfo[1].trim().split(' ');
        const group = titleAndGroup[0]; // This should capture '||IN||'
        const title = titleAndGroup.slice(1).join(' '); // Join the remaining parts as title

        // Check if the channel belongs to ||IN||
        if (group.includes('||IN||')) {
          currentChannel = {
            group: group,
            title: title,
          };
        }
      }
    } else if (line.startsWith('http') && currentChannel.title) {
      currentChannel.url = line;
      channels.push(currentChannel);
      currentChannel = {};
    }
  });

  return channels;
};

export default fetchPlaylist;
