import React, { useState, useEffect } from 'react';
import ChannelList from './components/ChannelList';
import HlsPlayer from 'react-hls-player';
import fetchPlaylist from './services/playlistService';
import SearchBar from './components/SearchBar';
import './App.css';
import logo from './logo5.png';

const App = () => {
  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getChannels = async () => {
      const fetchedChannels = await fetchPlaylist();
      if (fetchedChannels.length > 0) {
        // Extract unique categories from fetched channels
        const uniqueCategories = ['All', ...new Set(fetchedChannels.map(channel => channel.groupTitle))];
        setChannels(fetchedChannels);
        setCategories(uniqueCategories);
        setFilteredChannels(fetchedChannels); // Initially show all channels
      }
    };
    getChannels();
  }, []);

  useEffect(() => {
    filterChannels();
  }, [selectedCategory, searchQuery, channels]); // Add channels to dependencies to refilter when they change

  const filterChannels = () => {
    let filtered = channels;

    // Filter by selected category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(channel => channel.groupTitle === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(channel =>
        channel.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredChannels(filtered);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h2>Channels</h2>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-button ${category === selectedCategory ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <ChannelList channels={filteredChannels} onSelect={setSelectedChannel} />
      </div>
      <div className="main-content">
        {selectedChannel ? (
          <div className="player-container">
            <h2>Now Playing: {selectedChannel.title}</h2>
            <div className="player-wrapper">
              <HlsPlayer
                src={selectedChannel.url}
                autoPlay={true}
                controls={true}
                width="100%"
                height="auto"
              />
            </div>
          </div>
        ) : (
          <div className="placeholder">
            <h2>Select a channel to start watching</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
