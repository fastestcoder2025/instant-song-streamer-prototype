
import { useState } from "react";
import { Search, Music, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Playlist } from "@/pages/Index";

interface SidebarProps {
  playlists: Playlist[];
  activeView: 'search' | 'playlists';
  onViewChange: (view: 'search' | 'playlists') => void;
  onCreatePlaylist: (name: string) => void;
}

export const Sidebar = ({ playlists, activeView, onViewChange, onCreatePlaylist }: SidebarProps) => {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      onCreatePlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="w-64 bg-black p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Spotify MVP</h1>
        <p className="text-sm text-gray-400">Stream music instantly</p>
      </div>
      
      <nav className="space-y-2 mb-8">
        <Button
          variant={activeView === 'search' ? 'secondary' : 'ghost'}
          className={`w-full justify-start ${
            activeView === 'search' 
              ? 'bg-gray-800 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => onViewChange('search')}
        >
          <Search className="h-4 w-4 mr-3" />
          Search Music
        </Button>
        
        <Button
          variant={activeView === 'playlists' ? 'secondary' : 'ghost'}
          className={`w-full justify-start ${
            activeView === 'playlists' 
              ? 'bg-gray-800 text-white' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => onViewChange('playlists')}
        >
          <Music className="h-4 w-4 mr-3" />
          My Playlists
        </Button>
      </nav>
      
      <div className="border-t border-gray-800 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-400">PLAYLISTS</h3>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="ghost" className="p-1 h-6 w-6">
                <Plus className="h-4 w-4 text-gray-400" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Playlist</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Playlist name"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreatePlaylist()}
                />
                <Button 
                  onClick={handleCreatePlaylist}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!newPlaylistName.trim()}
                >
                  Create Playlist
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-1">
          {playlists.map((playlist) => (
            <div 
              key={playlist.id}
              className="text-sm text-gray-400 hover:text-white cursor-pointer p-2 rounded hover:bg-gray-800 transition-colors"
            >
              {playlist.name}
            </div>
          ))}
          
          {playlists.length === 0 && (
            <p className="text-xs text-gray-500">No playlists yet. Create your first one!</p>
          )}
        </div>
      </div>
    </div>
  );
};
