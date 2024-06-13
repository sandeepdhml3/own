import axios from 'axios';

const playlistUrl = 'https://raw.githubusercontent.com/sandeep0600/raw/main/tv_channels_uH5cBpMpDK6w_plus.m3u';

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

  const allowedGroups = [
    'SPORTS - SSC SPORTS SD / HD TV',
    'SAUDI SPORTS ᴴᴰ',
    'US - DOCUMENTRIES TV',
    'UK - DOCUMENTRIES TV',
    'SPORTS - ALL SPORTS LIVE',
    'SPORTS - CRICKET LIVE TV',
    'SPORTS - FOOTBALL TV',
    'SPORTS - FOOTBALL EVENTS',
    'SPORTS - ELEVEN SPORTS',
    'SPORTS - EPL',
    'SPORTS - BEIN SPORT SD / HD TV',
    'T20 WORLD CUP 2024',
    'BEIN ENTERTAINMENT',
    'USA - KIDS TV',
    'BEIN KIDS'
  ];

  lines.forEach(line => {
    if (line.startsWith('#EXTINF')) {
      const channelInfo = line.match(/#EXTINF:-1 tvg-id="(.+?)" tvg-logo="(.+?)" group-title="(.+?)",(.+)/);
      if (channelInfo && channelInfo[2] && allowedGroups.includes(channelInfo[3])) {  // Ensure the logo is present and group is allowed
        currentChannel = {
          id: channelInfo[1],
          logo: channelInfo[2],
          group: channelInfo[3],
          title: channelInfo[4],
        };
      }
    } else if (line.startsWith('http') || line.startsWith('https')) {
      // Filter for IPTV links that don't end with .mkv or .mp4
      if (currentChannel.logo && !line.match(/\.(mkv|mp4)$/)) {
        currentChannel.url = line;
        channels.push(currentChannel);
        currentChannel = {};
      }
    }
  });

  return channels;
};

export default fetchPlaylist;
