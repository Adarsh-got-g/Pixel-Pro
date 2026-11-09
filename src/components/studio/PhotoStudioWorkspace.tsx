import React, { useState, useRef, useEffect } from 'react';
import { StudioTool, SampleImage } from '../../types';
import { SAMPLE_IMAGES } from '../../data/brandAssets';
import { SidebarLogo } from '../brand/SidebarLogo';
import { SquareAppIcon } from '../brand/SquareAppIcon';
import { 
  Maximize2, 
  Sparkles, 
  Layers, 
  History, 
  Palette, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  Upload, 
  Eye, 
  Sliders, 
  SlidersHorizontal,
  SplitSquareVertical, 
  Check, 
  ChevronRight,
  Sun,
  Contrast,
  Aperture,
  Wand2
} from 'lucide-react';

interface PhotoStudioWorkspaceProps {
  initialTool?: StudioTool;
  userUploadedImage?: string | null;
  onOpenAbout: () => void;
  onOpenBrandHub: () => void;
}

export const PhotoStudioWorkspace: React.FC<PhotoStudioWorkspaceProps> = ({
  initialTool = 'enhance',
  userUploadedImage = null,
  onOpenAbout,
  onOpenBrandHub,
}) => {
  const [activeTool, setActiveTool] = useState<StudioTool>(initialTool);
  const [selectedImage, setSelectedImage] = useState<SampleImage>(SAMPLE_IMAGES[0]);
  const [customImageSrc, setCustomImageSrc] = useState<string | null>(userUploadedImage);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Canvas adjustments state
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // Split slider 0-100%
  const [showSplit, setShowSplit] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Tool specific states
  const [upscaleFactor, setUpscaleFactor] = useState<2 | 4 | 8>(4);
  const [clarity, setClarity] = useState<number>(65);
  const [contrast, setContrast] = useState<number>(115);
  const [saturation, setSaturation] = useState<number>(125);
  const [brightness, setBrightness] = useState<number>(105);
  const [sharpness, setSharpness] = useState<number>(40);
  const [bgMode, setBgMode] = useState<'transparent' | 'navy' | 'blur' | 'gradient'>('transparent');
  const [restoreScratches, setRestoreScratches] = useState<boolean>(true);
  const [faceEnhance, setFaceEnhance] = useState<boolean>(true);
  const [activePreset, setActivePreset] = useState<string>('ai_pro');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync if parent passes uploaded image
  useEffect(() => {
    if (userUploadedImage) {
      setCustomImageSrc(userUploadedImage);
    }
  }, [userUploadedImage]);

  const currentImageSrc = customImageSrc || selectedImage.afterUrl;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setCustomImageSrc(url);
    }
  };

  const handleResetFilters = () => {
    setClarity(65);
    setContrast(115);
    setSaturation(125);
    setBrightness(105);
    setSharpness(40);
    setActivePreset('ai_pro');
  };

  const applyPreset = (presetName: string) => {
    setActivePreset(presetName);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 300);

    switch (presetName) {
      case 'ai_pro':
        setClarity(75);
        setContrast(120);
        setSaturation(125);
        setBrightness(105);
        setSharpness(50);
        break;
      case 'cyber_neon':
        setClarity(90);
        setContrast(135);
        setSaturation(160);
        setBrightness(100);
        setSharpness(70);
        break;
      case 'studio_portrait':
        setClarity(50);
        setContrast(110);
        setSaturation(115);
        setBrightness(110);
        setSharpness(35);
        break;
      case 'archival_restore':
        setClarity(85);
        setContrast(130);
        setSaturation(90);
        setBrightness(112);
        setSharpness(60);
        break;
      default:
        handleResetFilters();
    }
  };

  const handleExport = () => {
    // Generate a downloadable copy of the active canvas
    const a = document.createElement('a');
    a.href = currentImageSrc;
    a.download = `ai_pixel_pro_${activeTool}_${upscaleFactor}x.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // CSS Filter string based on controls
  const filterString = `contrast(${contrast}%) saturate(${saturation}%) brightness(${brightness}%)`;

  return (
    <div className="relative h-[calc(100vh-64px)] w-full flex bg-[#080D20] text-white overflow-hidden select-none">
      {/* 1. Left Studio Sidebar Navigation */}
      <aside
        className={`bg-[#060A18] border-r border-[#121B38] flex flex-col justify-between transition-all duration-200 z-30 shrink-0 ${
          sidebarCollapsed ? 'w-18' : 'w-64'
        }`}
      >
        <div>
          {/* Sidebar Official Brand Logo Lockup */}
          <div className="p-4 border-b border-[#121B38]">
            <SidebarLogo
              collapsed={sidebarCollapsed}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
          </div>

          {/* Core Tools Menu corresponding directly to the 5 Logo Badges */}
          <div className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white/40">
              {!sidebarCollapsed ? 'AI Processing Engines' : 'Engines'}
            </div>

            {/* Tool 1: Upscale 1K-8K */}
            <button
              onClick={() => setActiveTool('upscale')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTool === 'upscale'
                  ? 'bg-gradient-to-r from-[#00C8FF]/20 to-[#A855F7]/10 text-[#00F0FF] border border-[#00C8FF]/40 shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  activeTool === 'upscale' ? 'bg-[#00C8FF] text-[#080D20]' : 'bg-white/10 text-[#00C8FF]'
                }`}
              >
                <Maximize2 size={15} />
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 text-left">
                  <div className="font-bold">Upscale 1K–8K</div>
                  <div className="text-[10px] text-white/40 font-normal">Super Resolution</div>
                </div>
              )}
            </button>

            {/* Tool 2: AI Enhance */}
            <button
              onClick={() => setActiveTool('enhance')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTool === 'enhance'
                  ? 'bg-gradient-to-r from-[#00C8FF]/20 to-[#A855F7]/10 text-[#00F0FF] border border-[#00C8FF]/40 shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  activeTool === 'enhance' ? 'bg-[#00C8FF] text-[#080D20]' : 'bg-white/10 text-[#A855F7]'
                }`}
              >
                <Sparkles size={15} />
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 text-left">
                  <div className="font-bold">AI Enhance</div>
                  <div className="text-[10px] text-white/40 font-normal">Clarity & HDR Dynamic</div>
                </div>
              )}
            </button>

            {/* Tool 3: BG Remove */}
            <button
              onClick={() => setActiveTool('bg_remove')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTool === 'bg_remove'
                  ? 'bg-gradient-to-r from-[#00C8FF]/20 to-[#A855F7]/10 text-[#00F0FF] border border-[#00C8FF]/40 shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  activeTool === 'bg_remove' ? 'bg-[#00C8FF] text-[#080D20]' : 'bg-white/10 text-[#EC35D8]'
                }`}
              >
                <Layers size={15} />
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 text-left">
                  <div className="font-bold">BG Remove</div>
                  <div className="text-[10px] text-white/40 font-normal">Sub-Pixel Alpha Mask</div>
                </div>
              )}
            </button>

            {/* Tool 4: Restore */}
            <button
              onClick={() => setActiveTool('restore')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTool === 'restore'
                  ? 'bg-gradient-to-r from-[#00C8FF]/20 to-[#A855F7]/10 text-[#00F0FF] border border-[#00C8FF]/40 shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  activeTool === 'restore' ? 'bg-[#00C8FF] text-[#080D20]' : 'bg-white/10 text-[#00F0FF]'
                }`}
              >
                <History size={15} />
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 text-left">
                  <div className="font-bold">Photo Restore</div>
                  <div className="text-[10px] text-white/40 font-normal">Scratch & Face Repair</div>
                </div>
              )}
            </button>

            {/* Tool 5: Edit & More */}
            <button
              onClick={() => setActiveTool('edit')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTool === 'edit'
                  ? 'bg-gradient-to-r from-[#00C8FF]/20 to-[#A855F7]/10 text-[#00F0FF] border border-[#00C8FF]/40 shadow-sm'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  activeTool === 'edit' ? 'bg-[#00C8FF] text-[#080D20]' : 'bg-white/10 text-[#FFA600]'
                }`}
              >
                <Palette size={15} />
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 text-left">
                  <div className="font-bold">Edit & More</div>
                  <div className="text-[10px] text-white/40 font-normal">Color Grading & FX</div>
                </div>
              )}
            </button>
          </div>

          {/* Sample Key Art Carousel */}
          {!sidebarCollapsed && (
            <div className="p-3 border-t border-[#121B38] mt-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 px-2 mb-2">
                Sample Workflows
              </div>
              <div className="space-y-1.5">
                {SAMPLE_IMAGES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      setSelectedImage(sample);
                      setCustomImageSrc(null);
                      setActiveTool(sample.suggestedTool);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center gap-2 ${
                      selectedImage.id === sample.id && !customImageSrc
                        ? 'bg-[#101A3D] border border-[#00C8FF]/40 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <SquareAppIcon size={16} />
                    <div className="truncate">
                      <div className="font-semibold truncate">{sample.name}</div>
                      <div className="text-[9px] text-[#00C8FF]">{sample.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#121B38] bg-[#050814]">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 transition-colors"
          >
            <Upload size={14} />
            {!sidebarCollapsed && <span>Load Image...</span>}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </aside>

      {/* 2. Main Studio Canvas Center */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#080D20] relative overflow-hidden">
        {/* Canvas Toolbar Top Bar */}
        <div className="h-12 bg-[#091026] border-b border-[#121B38] px-4 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-xs text-white">
              {customImageSrc ? 'Custom Loaded Image' : selectedImage.name}
            </span>
            <span className="text-white/30 text-xs">·</span>
            <span className="text-[11px] font-mono text-[#00F0FF] bg-[#00C8FF]/10 px-2 py-0.5 rounded border border-[#00C8FF]/20">
              {activeTool === 'upscale' ? `${upscaleFactor}x (7680×4320 UHD)` : 'Full Color Dynamic'}
            </span>
            {isProcessing && (
              <span className="flex items-center gap-1.5 text-[11px] text-[#00C8FF] font-medium animate-pulse">
                <Wand2 size={12} /> Neural Processing...
              </span>
            )}
          </div>

          {/* View & Canvas Controls */}
          <div className="flex items-center gap-2 text-xs">
            {/* Split Comparison Toggle */}
            <button
              onClick={() => setShowSplit(!showSplit)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors ${
                showSplit
                  ? 'bg-[#00C8FF]/20 border-[#00C8FF]/40 text-[#00F0FF]'
                  : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
              }`}
              title="Toggle Split Before/After View"
            >
              <SplitSquareVertical size={13} />
              <span>Before / After</span>
            </button>

            {/* Zoom Controls */}
            <div className="flex items-center bg-[#050815] rounded-lg border border-white/10 p-0.5">
              <button
                onClick={() => setZoomLevel((z) => Math.max(25, z - 25))}
                className="p-1 hover:bg-white/10 rounded text-white/70 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut size={13} />
              </button>
              <span className="font-mono text-[11px] px-2 text-white/80 min-w-[48px] text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(400, z + 25))}
                className="p-1 hover:bg-white/10 rounded text-white/70 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn size={13} />
              </button>
              <button
                onClick={() => setZoomLevel(100)}
                className="text-[10px] px-1.5 py-0.5 hover:bg-white/10 rounded text-white/50 hover:text-white"
              >
                Fit
              </button>
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#00C8FF] via-[#A855F7] to-[#EC35D8] text-white font-bold text-xs shadow-md hover:brightness-110 transition-all"
            >
              <Download size={13} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Viewport Canvas Stage */}
        <div className="flex-1 relative overflow-hidden flex items-center justify-center p-6 bg-[radial-gradient(#141f3d_1px,transparent_1px)] [background-size:20px_20px] bg-[#070B1C]">
          {/* Transparency checkerboard background if in BG Remove mode */}
          {activeTool === 'bg_remove' && bgMode === 'transparent' && (
            <div className="absolute inset-0 bg-[radial-gradient(#202d54_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
          )}

          {/* Canvas Image Container with Zoom */}
          <div
            className="relative transition-transform duration-100 ease-out flex items-center justify-center shadow-2xl rounded-2xl overflow-hidden max-h-[82vh] max-w-[85vw]"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            {/* Split Comparison Slider Container */}
            {showSplit ? (
              <div className="relative select-none overflow-hidden max-h-[75vh]">
                {/* Enhanced "After" Layer */}
                <div
                  className="relative overflow-hidden transition-all duration-75"
                  style={{
                    filter: filterString,
                  }}
                >
                  <img
                    src={currentImageSrc}
                    alt="AI PIXEL PRO Enhanced"
                    className="max-h-[75vh] w-auto object-contain block select-none pointer-events-none"
                  />
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 backdrop-blur-sm text-[10px] font-bold text-[#00F0FF] border border-[#00C8FF]/40">
                    AI PRO ENHANCED
                  </div>
                </div>

                {/* Original "Before" Layer clipped to slider position */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-[#00F0FF] shadow-[0_0_15px_#00F0FF]"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={currentImageSrc}
                    alt="Original Unedited"
                    className="max-h-[75vh] w-auto object-contain block max-w-none grayscale-[30%] opacity-90 select-none pointer-events-none"
                    style={{
                      width: 'auto',
                      height: '100%',
                    }}
                  />
                  <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/70 backdrop-blur-sm text-[10px] font-bold text-white/70 border border-white/20">
                    ORIGINAL
                  </div>
                </div>

                {/* Slider Dragger Handle */}
                <div
                  className="absolute inset-y-0 -ml-3.5 flex items-center justify-center pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-7 h-7 rounded-full bg-[#080D20] border-2 border-[#00F0FF] shadow-[0_0_15px_rgba(0,200,255,0.8)] flex items-center justify-center text-[#00F0FF]">
                    <SplitSquareVertical size={13} />
                  </div>
                </div>

                {/* Range overlay to capture dragging across full surface */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                />
              </div>
            ) : (
              /* Full Enhanced Image View */
              <div
                className="relative rounded-xl overflow-hidden shadow-2xl"
                style={{ filter: filterString }}
              >
                <img
                  src={currentImageSrc}
                  alt="AI PIXEL PRO Workspace View"
                  className="max-h-[75vh] w-auto object-contain block"
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Slogan Strip */}
        <div className="h-7 bg-[#050814] border-t border-[#121B38] px-4 flex items-center justify-between text-[11px] text-white/40">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
            <span className="font-semibold text-white/60">AI PIXEL PRO</span>
            <span>· Enhance • Edit • Restore • Create</span>
          </div>
          <div className="font-mono text-[10px] text-[#00C8FF]">
            Color Space: sRGB / DCI-P3 · 16-bit Float Pipeline
          </div>
        </div>
      </main>

      {/* 3. Right Studio Controls & Engine Inspector */}
      <aside className="w-80 bg-[#070C1E] border-l border-[#121B38] flex flex-col justify-between overflow-y-auto shrink-0 z-20">
        <div className="p-5 space-y-6">
          {/* Tool-specific Parameters */}
          {activeTool === 'upscale' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <Maximize2 size={15} className="text-[#00C8FF]" />
                  Neural 8K Upscaler
                </h3>
                <span className="text-[10px] font-mono text-[#00F0FF] bg-[#00C8FF]/10 px-2 py-0.5 rounded">
                  ESRGAN v4
                </span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Synthesize high-frequency micro-details, hair strands, skin pores, and landscape textures.
              </p>

              {/* Upscale Scale Multiplier */}
              <div>
                <label className="text-xs font-semibold text-white/80 block mb-2">
                  Resolution Multiplier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[2, 4, 8].map((factor) => (
                    <button
                      key={factor}
                      onClick={() => setUpscaleFactor(factor as 2 | 4 | 8)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        upscaleFactor === factor
                          ? 'bg-[#00C8FF]/20 border-[#00C8FF] text-[#00F0FF] shadow-[0_0_15px_rgba(0,200,255,0.3)]'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      {factor}x UHD
                    </button>
                  ))}
                </div>
              </div>

              {/* Sharpness Slider */}
              <div>
                <div className="flex justify-between text-xs text-white/80 mb-1">
                  <span>Micro-Edge Reconstruction</span>
                  <span className="font-mono text-[#00C8FF]">{sharpness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sharpness}
                  onChange={(e) => setSharpness(Number(e.target.value))}
                  className="w-full accent-[#00C8FF]"
                />
              </div>
            </div>
          )}

          {activeTool === 'enhance' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <Sparkles size={15} className="text-[#A855F7]" />
                  AI Enhancement Engine
                </h3>
                <span className="text-[10px] font-mono text-[#A855F7] bg-[#A855F7]/10 px-2 py-0.5 rounded">
                  Neural Tone
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-white/80 mb-1">
                    <span>AI Clarity & HDR</span>
                    <span className="font-mono text-[#00C8FF]">{clarity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={clarity}
                    onChange={(e) => setClarity(Number(e.target.value))}
                    className="w-full accent-[#00C8FF]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-white/80 mb-1">
                    <span>Dynamic Contrast</span>
                    <span className="font-mono text-[#00C8FF]">{contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="160"
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    className="w-full accent-[#00C8FF]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-white/80 mb-1">
                    <span>Color Vibrance</span>
                    <span className="font-mono text-[#EC35D8]">{saturation}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="180"
                    value={saturation}
                    onChange={(e) => setSaturation(Number(e.target.value))}
                    className="w-full accent-[#EC35D8]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTool === 'bg_remove' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <Layers size={15} className="text-[#EC35D8]" />
                  Background Isolation
                </h3>
                <span className="text-[10px] font-mono text-[#EC35D8] bg-[#EC35D8]/10 px-2 py-0.5 rounded">
                  Alpha Matting
                </span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Extract foreground subjects with transparent alpha channel or composite over custom studio backgrounds.
              </p>

              <div>
                <label className="text-xs font-semibold text-white/80 block mb-2">
                  Backdrop Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setBgMode('transparent')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border text-left transition-all ${
                      bgMode === 'transparent'
                        ? 'bg-[#EC35D8]/20 border-[#EC35D8] text-white shadow-sm'
                        : 'bg-white/5 border-white/10 text-white/60'
                    }`}
                  >
                    Transparent PNG
                  </button>
                  <button
                    onClick={() => setBgMode('navy')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border text-left transition-all ${
                      bgMode === 'navy'
                        ? 'bg-[#00C8FF]/20 border-[#00C8FF] text-[#00F0FF] shadow-sm'
                        : 'bg-white/5 border-white/10 text-white/60'
                    }`}
                  >
                    Deep Navy Studio
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTool === 'restore' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <History size={15} className="text-[#00F0FF]" />
                  Archival Restoration
                </h3>
                <span className="text-[10px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded">
                  GFPGAN Core
                </span>
              </div>

              <div className="space-y-2">
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
                  <span className="text-xs text-white font-medium">Automatic Scratch & Dust Healing</span>
                  <input
                    type="checkbox"
                    checked={restoreScratches}
                    onChange={(e) => setRestoreScratches(e.target.checked)}
                    className="accent-[#00C8FF]"
                  />
                </label>
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
                  <span className="text-xs text-white font-medium">AI Face Reconstruction</span>
                  <input
                    type="checkbox"
                    checked={faceEnhance}
                    onChange={(e) => setFaceEnhance(e.target.checked)}
                    className="accent-[#00C8FF]"
                  />
                </label>
              </div>
            </div>
          )}

          {activeTool === 'edit' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <Palette size={15} className="text-[#FFA600]" />
                  Studio Color Presets
                </h3>
                <span className="text-[10px] font-mono text-[#FFA600] bg-[#FFA600]/10 px-2 py-0.5 rounded">
                  3D LUTs
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'ai_pro', label: 'AI Pixel Pro (Default)' },
                  { id: 'cyber_neon', label: 'Cyberpunk Neon' },
                  { id: 'studio_portrait', label: 'Studio Warm' },
                  { id: 'archival_restore', label: 'Archival Film' },
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset.id)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-left border transition-all ${
                      activePreset === preset.id
                        ? 'bg-gradient-to-r from-[#00C8FF]/20 to-[#EC35D8]/20 border-[#00C8FF] text-white shadow-sm'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Adjustment Sliders (Always Available) */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                Light & Color Balance
              </span>
              <button
                onClick={handleResetFilters}
                className="text-[10px] text-white/40 hover:text-white flex items-center gap-1"
              >
                <RotateCcw size={10} /> Reset
              </button>
            </div>

            <div>
              <div className="flex justify-between text-xs text-white/80 mb-1">
                <span>Exposure / Brightness</span>
                <span className="font-mono text-[#00C8FF]">{brightness}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="140"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full accent-[#00C8FF]"
              />
            </div>
          </div>
        </div>

        {/* Right Footer */}
        <div className="p-4 border-t border-[#121B38] bg-[#050814] flex flex-col gap-2">
          <button
            onClick={onOpenBrandHub}
            className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 text-xs font-medium border border-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <span>View 9 Brand Logo Assets</span>
            <ChevronRight size={13} />
          </button>
          <div className="text-[10px] text-center text-white/30">
            AI PIXEL PRO v2.4.0 · Studio Workspace
          </div>
        </div>
      </aside>
    </div>
  );
};
