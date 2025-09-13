import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, StopCircle, User } from "lucide-react";

interface CameraViewProps {
  onCapture: (imageData: string) => void;
  isRecognizing: boolean;
}

export const CameraView = ({ onCapture, isRecognizing }: CameraViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string>("");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        setError("");
      }
    } catch (err) {
      setError("Unable to access camera. Please check permissions.");
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        onCapture(imageData);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Card className="p-6 bg-gradient-to-br from-card via-card to-card/90 border-border/50 backdrop-blur-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Face Recognition</h3>
          </div>
          
          <div className="flex gap-2">
            {!isStreaming ? (
              <Button onClick={startCamera} variant="default" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Start Camera
              </Button>
            ) : (
              <Button onClick={stopCamera} variant="destructive" size="sm">
                <StopCircle className="w-4 h-4 mr-2" />
                Stop Camera
              </Button>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
            {error ? (
              <div className="flex items-center justify-center h-full text-destructive">
                <p>{error}</p>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ display: isStreaming ? 'block' : 'none' }}
                />
                {!isStreaming && (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Camera not active</p>
                    </div>
                  </div>
                )}
                
                {isRecognizing && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="bg-background/90 px-4 py-2 rounded-lg text-sm font-medium animate-pulse">
                      Recognizing...
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          
          {isStreaming && (
            <div className="mt-4 flex justify-center">
              <Button 
                onClick={captureImage}
                disabled={isRecognizing}
                className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                {isRecognizing ? 'Processing...' : 'Mark Attendance'}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />
    </Card>
  );
};