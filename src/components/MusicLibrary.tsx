
import { Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Track, Playlist } from "@/pages/Index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MusicLibraryProps {
  tracks: Track[];
  onPlayTrack: (track: Track) => void;
  onAddToPlaylist: (playlistId: string, track: Track) => void;
  playlists: Playlist[];
}

export const MusicLibrary = ({ tracks, onPlayTrack, onAddToPlaylist, playlists }: MusicLibraryProps) => {
  if (tracks.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-20">
        <div className="text-6xl mb-4">🎵</div>
        <h2 className="text-2xl font-bold mb-2">Search for Music</h2>
        <p>Find your favorite songs, artists, and albums</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Search Results</h2>
      <div className="space-y-2">
        {tracks.map((track) => (
          <div 
            key={track.id}
            className="flex items-center p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
          >
            <img 
              src={track.albumArt} 
              alt={track.album}
              className="w-12 h-12 rounded object-cover mr-4"
            />
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-white truncate">{track.title}</h3>
              <p className="text-sm text-gray-400 truncate">{track.artist} • {track.album}</p>
            </div>
            
            <div className="text-sm text-gray-400 mr-4">
              {track.duration}
            </div>
            
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                onClick={() => onPlayTrack(track)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Play className="h-4 w-4" />
              </Button>
              
              {playlists.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="secondary">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 border-gray-700">
                    {playlists.map((playlist) => (
                      <DropdownMenuItem 
                        key={playlist.id}
                        onClick={() => onAddToPlaylist(playlist.id, track)}
                        className="text-white hover:bg-gray-700"
                      >
                        {playlist.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
