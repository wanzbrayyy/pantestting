
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const VideoPlayer = ({ videoUrl, title = 'Learning Video', autoplay = false }) => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlay = () => {
    if (videoUrl) {
      setIsPlaying(!isPlaying);
      toast({
        title: isPlaying ? 'Video Paused' : 'Video Playing',
        description: `${title} ${isPlaying ? 'paused' : 'started'}`
      });
    } else {
      toast({
        title: t('notImplemented')
      });
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? 'Audio Enabled' : 'Audio Muted'
    });
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    toast({
      title: 'Video Restarted',
      description: 'Video has been restarted from the beginning'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            <Play className="w-5 h-5 mr-2 text-purple-400" />
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="video-container bg-black rounded-lg overflow-hidden relative group">
            {videoUrl ? (
              <>
                <iframe
                  src={`${videoUrl}${autoplay ? '?autoplay=1' : ''}`}
                  className="w-full h-full"
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                
                {/* Custom Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={handlePlay}
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      
                      <Button
                        onClick={handleMute}
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                      
                      <Button
                        onClick={handleRestart}
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Button
                      onClick={handleFullscreen}
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Play className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Video Player</h3>
                  <p className="text-gray-300 mb-6">
                    Learning videos will be displayed here
                  </p>
                  <Button onClick={handlePlay} className="btn-primary">
                    <Play className="w-4 h-4 mr-2" />
                    {t('watchVideo')}
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-300 text-sm">
              Watch this video to enhance your understanding of the topic
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 bg-black/50">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <Button
              onClick={() => setIsFullscreen(false)}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Exit Fullscreen
            </Button>
          </div>
          
          <div className="flex-1">
            {videoUrl ? (
              <iframe
                src={videoUrl}
                className="w-full h-full border-0"
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Play className="w-24 h-24 text-purple-400 mx-auto mb-4" />
                  <p className="text-xl text-white">No video available</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default VideoPlayer;
