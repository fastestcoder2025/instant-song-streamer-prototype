
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { MusicLibrary } from "@/components/MusicLibrary";
import { PlayerControls } from "@/components/PlayerControls";
import { Sidebar } from "@/components/Sidebar";
import { PlaylistManager } from "@/components/PlaylistManager";

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  albumArt: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  createdAt: Date;
}

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [activeView, setActiveView] = useState<'search' | 'playlists'>('search');

  const handlePlayTrack = (track: Track) => {
    console.log('Playing track:', track.title);
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePauseResume = () => {
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? 'Pausing music' : 'Resuming music');
  };

  const createPlaylist = (name: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      tracks: [],
      createdAt: new Date()
    };
    setPlaylists([...playlists, newPlaylist]);
    console.log('Created playlist:', name);
  };

  const addToPlaylist = (playlistId: string, track: Track) => {
    setPlaylists(playlists.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, tracks: [...playlist.tracks, track] }
        : playlist
    ));
    console.log('Added track to playlist:', track.title);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          playlists={playlists}
          activeView={activeView}
          onViewChange={setActiveView}
          onCreatePlaylist={createPlaylist}
        />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <SearchBar onSearchResults={setSearchResults} />
          </div>
          
          <div className="flex-1 overflow-y-auto p-6">
            {activeView === 'search' ? (
              <MusicLibrary 
                tracks={searchResults}
                onPlayTrack={handlePlayTrack}
                onAddToPlaylist={addToPlaylist}
                playlists={playlists}
              />
            ) : (
              <PlaylistManager 
                playlists={playlists}
                onPlayTrack={handlePlayTrack}
                onAddToPlaylist={addToPlaylist}
                setPlaylists={setPlaylists}
              />
            )}
          </div>
        </main>
      </div>
      
      {currentTrack && (
        <PlayerControls 
          track={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePauseResume}
        />
      )}
    </div>
  );
};

export default Index;
