
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Track } from "@/pages/Index";

interface PlayerControlsProps {
  track: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
}

export const PlayerControls = ({ track, isPlaying, onPlayPause }: PlayerControlsProps) => {
  return (
    <div className="h-20 bg-gray-900 border-t border-gray-800 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1">
        <img 
          src={track.albumArt} 
          alt={track.album}
          className="w-12 h-12 rounded object-cover"
        />
        <div className="min-w-0">
          <h4 className="font-medium text-white truncate">{track.title}</h4>
          <p className="text-sm text-gray-400 truncate">{track.artist}</p>
        </div>
      </div>
      
      <div className="flex flex-col items-center space-y-2 flex-1">
        <div className="flex items-center space-x-4">
          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button 
            size="sm"
            onClick={onPlayPause}
            className="bg-white text-black hover:bg-gray-200 rounded-full w-8 h-8 p-0"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2 w-full max-w-md">
          <span className="text-xs text-gray-400">0:00</span>
          <Slider 
            value={[25]} 
            max={100} 
            step={1}
            className="flex-1"
          />
          <span className="text-xs text-gray-400">{track.duration}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 flex-1 justify-end">
        <Volume2 className="h-4 w-4 text-gray-400" />
        <Slider 
          value={[70]} 
          max={100} 
          step={1}
          className="w-24"
        />
      </div>
    </div>
  );
};
