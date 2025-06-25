
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Track } from "@/pages/Index";

// Mock music database for demonstration
const MOCK_TRACKS: Track[] = [
  {
    id: "1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    duration: "5:55",
    albumArt: "/placeholder.svg"
  },
  {
    id: "2", 
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    duration: "6:30",
    albumArt: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
    duration: "3:03",
    albumArt: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin", 
    album: "Led Zeppelin IV",
    duration: "8:02",
    albumArt: "/placeholder.svg"
  },
  {
    id: "5",
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    album: "Appetite for Destruction", 
    duration: "5:03",
    albumArt: "/placeholder.svg"
  },
  {
    id: "6",
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
    duration: "5:01",
    albumArt: "/placeholder.svg"
  },
  {
    id: "7",
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    duration: "4:54",
    albumArt: "/placeholder.svg"
  },
  {
    id: "8",
    title: "Like a Rolling Stone",
    artist: "Bob Dylan",
    album: "Highway 61 Revisited",
    duration: "6:13",
    albumArt: "/placeholder.svg"
  }
];

interface SearchBarProps {
  onSearchResults: (results: Track[]) => void;
}

export const SearchBar = ({ onSearchResults }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    if (value.trim() === "") {
      onSearchResults([]);
      return;
    }

    const results = MOCK_TRACKS.filter(track =>
      track.title.toLowerCase().includes(value.toLowerCase()) ||
      track.artist.toLowerCase().includes(value.toLowerCase()) ||
      track.album.toLowerCase().includes(value.toLowerCase())
    );
    
    console.log(`Search performed for: "${value}", found ${results.length} results`);
    onSearchResults(results);
  };

  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search for songs, artists, or albums..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
      />
    </div>
  );
};
