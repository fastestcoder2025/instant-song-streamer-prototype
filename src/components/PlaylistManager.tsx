
import { Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Track, Playlist } from "@/pages/Index";

interface PlaylistManagerProps {
  playlists: Playlist[];
  onPlayTrack: (track: Track) => void;
  onAddToPlaylist: (playlistId: string, track: Track) => void;
  setPlaylists: (playlists: Playlist[]) => void;
}

export const PlaylistManager = ({ playlists, onPlayTrack, setPlaylists }: PlaylistManagerProps) => {
  const removeTrackFromPlaylist = (playlistId: string, trackId: string) => {
    setPlaylists(playlists.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, tracks: playlist.tracks.filter(track => track.id !== trackId) }
        : playlist
    ));
    console.log('Removed track from playlist');
  };

  if (playlists.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-20">
        <div className="text-6xl mb-4">🎵</div>
        <h2 className="text-2xl font-bold mb-2">No Playlists Yet</h2>
        <p>Create your first playlist to organize your favorite songs</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6">My Playlists</h2>
      
      {playlists.map((playlist) => (
        <div key={playlist.id} className="bg-gray-800/30 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white">{playlist.name}</h3>
            <p className="text-sm text-gray-400">
              {playlist.tracks.length} {playlist.tracks.length === 1 ? 'song' : 'songs'}
            </p>
          </div>
          
          {playlist.tracks.length === 0 ? (
            <p className="text-gray-500 text-sm">No songs in this playlist yet. Add some from search!</p>
          ) : (
            <div className="space-y-2">
              {playlist.tracks.map((track) => (
                <div 
                  key={`${playlist.id}-${track.id}`}
                  className="flex items-center p-3 rounded bg-gray-800/50 hover:bg-gray-800 transition-colors group"
                >
                  <img 
                    src={track.albumArt} 
                    alt={track.album}
                    className="w-10 h-10 rounded object-cover mr-3"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white truncate text-sm">{track.title}</h4>
                    <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                  </div>
                  
                  <div className="text-xs text-gray-400 mr-3">
                    {track.duration}
                  </div>
                  
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      onClick={() => onPlayTrack(track)}
                      className="bg-green-600 hover:bg-green-700 text-white h-7 w-7 p-0"
                    >
                      <Play className="h-3 w-3" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeTrackFromPlaylist(playlist.id, track.id)}
                      className="h-7 w-7 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
