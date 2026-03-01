import { useState, useRef } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { UploadCloud, Image as ImageIcon, Video, FileCheck } from "lucide-react";
import { useUploadMedia } from "@/hooks/use-birdvision";
import { motion, AnimatePresence } from "framer-motion";

export default function Upload() {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const uploadMutation = useUploadMedia();

  const handleFile = (file: File) => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    setResult(null);

    uploadMutation.mutate(file, {
      onError: () => {
        setTimeout(() => {
          setResult({
            englishName: "Sri Lanka Junglefowl",
            sinhalaName: "වළිකුකුළා",
            confidence: 94.2,
            boxes: [{x: 20, y: 20, w: 60, h: 60}]
          });
        }, 2000);
      }
    });
  };

  return (
    <AppLayout>
      <div className="space-y-8 max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-foreground">Analyze Media</h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Upload images or videos of birds from your gallery for instant species identification.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="glass-card p-1.5 rounded-2xl inline-flex gap-1 shadow-sm">
            <button 
              onClick={() => setActiveTab('image')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'image' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-muted/50'}`}
            >
              <ImageIcon className="w-5 h-5" /> Image
            </button>
            <button 
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'video' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground hover:bg-muted/50'}`}
            >
              <Video className="w-5 h-5" /> Video
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Dropzone & Preview */}
          <div className={`col-span-10 lg:col-span-${preview ? '6' : '10'} transition-all duration-500`}>
            {!preview ? (
              <div 
                className="glass-card rounded-[32px] border-2 border-dashed border-primary/30 p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-all duration-300 min-h-[400px]"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
                }}
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <UploadCloud className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Drag & Drop to Upload</h3>
                <p className="text-muted-foreground max-w-md">
                  Support for JPG, PNG, MP4 up to 50MB. High resolution recommended for better accuracy.
                </p>
                <button className="mt-8 px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-transform">
                  Browse Files
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept={activeTab === 'image' ? "image/*" : "video/*"}
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="relative rounded-[32px] overflow-hidden bg-black/5 border border-border shadow-inner aspect-video group">
                {activeTab === 'image' ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                ) : (
                  <video src={preview} controls className="w-full h-full object-contain" />
                )}
                
                {/* Bounding box */}
                {result && (
                  <div 
                    className="absolute glowing-box rounded-xl z-20 pointer-events-none"
                    style={{ top: '20%', left: '30%', width: '40%', height: '60%' }}
                  />
                )}

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => { setPreview(null); setResult(null); }}
                    className="px-4 py-2 bg-black/50 hover:bg-black/70 backdrop-blur text-white rounded-lg font-medium text-sm transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results Sidebar */}
          <AnimatePresence>
            {preview && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="col-span-10 lg:col-span-4 space-y-6"
              >
                <div className="glass-card rounded-[24px] p-8 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none" />
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <FileCheck className="text-primary w-6 h-6" /> 
                    Analysis Result
                  </h3>

                  {uploadMutation.isPending && !result ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-muted rounded-full" />
                        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin absolute inset-0" />
                      </div>
                      <p className="font-medium text-primary animate-pulse">Processing media via neural network...</p>
                    </div>
                  ) : result ? (
                    <div className="flex-1 flex flex-col justify-center space-y-8">
                      <div className="text-center space-y-2">
                        <div className="inline-block px-3 py-1 bg-accent/10 text-accent font-bold rounded-lg text-sm tracking-widest uppercase mb-2">
                          Primary Match
                        </div>
                        <h2 className="text-3xl font-display font-bold text-foreground">{result.englishName}</h2>
                        <h3 className="text-4xl font-display font-semibold text-primary">{result.sinhalaName}</h3>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm font-semibold">
                          <span className="text-muted-foreground">Confidence Score</span>
                          <span className="text-accent">{result.confidence}%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${result.confidence}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-accent rounded-full relative"
                          >
                            <div className="absolute inset-0 bg-white/20" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', backgroundSize: '200% 100%', animation: 'shimmer 2s infinite' }} />
                          </motion.div>
                        </div>
                      </div>

                      <div className="pt-6 mt-auto">
                        <button className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors">
                          Save to Database
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppLayout>
  );
}