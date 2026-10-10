import React, { useState } from 'react';
import { Sparkles, Download, Loader2, Image as ImageIcon, Sliders, RefreshCw, Eye } from 'lucide-react';

export const AiImageStudio: React.FC = () => {
  const [prompt, setPrompt] = useState(
    'A talented youth football player wearing the dark green and obsidian academy kit, celebrating a goal on a floodlit stadium pitch, high speed sports camera photography'
  );
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('2K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const presets = [
    {
      title: 'Cinematic Player Card',
      prompt: 'A bold sports trading card portrait of a young football prodigy in green and black kit, holding a football with intense focus under stadium floodlights, bokeh pitch background.',
      ratio: '9:16' as const,
    },
    {
      title: 'Matchday Stadium Wallpaper',
      prompt: 'Spectacular wide-angle evening view of a packed modern football academy pitch under atmospheric floodlights and light mist, green pitch lines sharp and glowing.',
      ratio: '16:9' as const,
    },
    {
      title: 'Slalom Agility Drill in Action',
      prompt: 'High action dynamic photograph of a player sprinting through neon training cones, water droplets spraying from wet football boots, electric green accents.',
      ratio: '4:3' as const,
    },
    {
      title: 'Academy Crest & Kit Mockup',
      prompt: 'Clean studio mockup of an obsidian black and electric green football kit jersey with "Hazik\'s Footstep with Ball" modern crest emblem embroidered on the chest.',
      ratio: '1:1' as const,
    },
  ];

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          imageSize, // 1K, 2K, 4K
          aspectRatio,
        }),
      });

      const data = await res.json();

      if (res.ok && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
      } else {
        setErrorMsg(
          data.error || 'Failed to generate image. Please verify your Gemini API key in Settings > Secrets.'
        );
      }
    } catch (err: any) {
      console.error('Image generation error:', err);
      setErrorMsg('Could not connect to the image generation service. Please check network connectivity.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-[#080B0A] relative" id="studio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase font-bold tracking-[0.25em] text-[#19D66B]">
            <Sparkles className="w-4 h-4 text-[#19D66B]" />
            <span>AI SPORTS MEDIA STUDIO</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
            CUSTOM PLAYER CARD & WALLPAPER GENERATOR
          </h2>
          <p className="text-sm text-[#A7B0AA]">
            Powered by <code className="text-[#19D66B] font-mono text-xs">gemini-3-pro-image-preview</code>. Generate bespoke high-definition wallpapers, player trading cards, and academy graphics with selectable 1K, 2K, and 4K resolution.
          </p>
        </div>

        {/* Generator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-6 p-7 rounded-xl bg-[#050706] border border-[#0B2419] space-y-6 shadow-xl">
            {/* Quick Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-stone-400 tracking-wider">
                Quick Creative Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPrompt(preset.prompt);
                      setAspectRatio(preset.ratio);
                    }}
                    className="p-2.5 rounded bg-[#080B0A] border border-[#0B2419] hover:border-[#19D66B]/50 hover:bg-[#0B2419]/40 text-left transition-colors group"
                  >
                    <div className="text-xs font-semibold text-white group-hover:text-[#19D66B] truncate">
                      {preset.title}
                    </div>
                    <div className="text-[10px] text-stone-500">
                      {preset.ratio} ratio
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Prompt */}
            <form onSubmit={handleGenerate} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase text-white tracking-wider flex items-center justify-between">
                  <span>Image Description & Concept *</span>
                  <span className="text-[10px] text-stone-500">Prompt</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your football scene, player card, or action drill..."
                  className="w-full px-4 py-3 rounded bg-[#080B0A] border border-[#0B2419] text-white text-sm focus:outline-none focus:border-[#19D66B] transition-colors"
                />
              </div>

              {/* Resolution Choice (1K, 2K, 4K) - Feature Requirement */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase text-white tracking-wider">
                    Select Image Size (Resolution) *
                  </label>
                  <span className="text-[10px] font-mono text-[#19D66B]">
                    gemini-3-pro-image-preview
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {(['1K', '2K', '4K'] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setImageSize(size)}
                      className={`py-2.5 px-3 rounded font-display font-bold text-sm tracking-wider uppercase border transition-all ${
                        imageSize === size
                          ? 'bg-[#19D66B] text-[#080B0A] border-[#19D66B] shadow-[0_0_15px_rgba(25,214,107,0.3)]'
                          : 'bg-[#080B0A] text-[#A7B0AA] border-[#0B2419] hover:border-white/20'
                      }`}
                    >
                      {size} ULTRA
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-white tracking-wider">
                  Aspect Ratio
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['16:9', '9:16', '4:3', '1:1'] as const).map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setAspectRatio(ratio)}
                      className={`py-2 px-2 text-xs font-medium rounded border transition-colors ${
                        aspectRatio === ratio
                          ? 'bg-[#0B2419] text-[#19D66B] border-[#19D66B]'
                          : 'bg-[#080B0A] text-[#A7B0AA] border-[#0B2419] hover:text-white'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Generate Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-4 rounded-sm bg-[#19D66B] text-[#080B0A] font-display font-black text-xl tracking-wider uppercase hover:bg-emerald-400 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(25,214,107,0.25)]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>RENDERING {imageSize} ASSET...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>GENERATE {imageSize} IMAGE</span>
                  </>
                )}
              </button>
            </form>

            {errorMsg && (
              <div className="p-3.5 rounded bg-red-950/40 border border-red-500/40 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}
          </div>

          {/* Image Display / Preview Area */}
          <div className="lg:col-span-6 p-7 rounded-xl bg-[#050706] border border-[#0B2419] flex flex-col justify-between min-h-[460px] shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <span className="text-xs uppercase font-bold tracking-wider text-white">
                Rendered Canvas ({imageSize} Output)
              </span>
              {generatedImage && (
                <a
                  href={generatedImage}
                  download={`haziks_academy_${imageSize.toLowerCase()}_image.png`}
                  className="px-3 py-1.5 rounded bg-[#0B2419] hover:bg-[#19D66B] hover:text-[#080B0A] text-xs font-semibold text-white border border-[#19D66B]/30 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {imageSize}</span>
                </a>
              )}
            </div>

            <div className="my-auto py-6 flex items-center justify-center">
              {isGenerating ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full border-2 border-[#19D66B] border-t-transparent animate-spin mx-auto" />
                  <div className="space-y-1">
                    <div className="font-display font-bold text-lg text-white uppercase tracking-wider">
                      Rendering in {imageSize} with gemini-3-pro-image-preview
                    </div>
                    <p className="text-xs text-[#A7B0AA] max-w-xs mx-auto">
                      Applying pitch lighting, athletic textures, and cinematic color grade...
                    </p>
                  </div>
                </div>
              ) : generatedImage ? (
                <div className="relative rounded-lg overflow-hidden border border-[#0B2419] bg-black max-h-[460px] w-full flex items-center justify-center group">
                  <img
                    src={generatedImage}
                    alt="Generated football academy visual"
                    className="max-h-[460px] w-full object-contain"
                  />
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 text-[10px] font-mono text-[#19D66B] border border-[#19D66B]/30">
                    {imageSize} · {aspectRatio}
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-3 py-12">
                  <div className="w-14 h-14 rounded-full bg-[#0B2419] border border-[#19D66B]/30 flex items-center justify-center text-[#19D66B] mx-auto">
                    <ImageIcon className="w-7 h-7" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-white uppercase">
                    No Image Rendered Yet
                  </h4>
                  <p className="text-xs text-[#A7B0AA] max-w-sm mx-auto">
                    Choose one of the presets or type a prompt on the left, select 1K, 2K, or 4K resolution, and click generate.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-stone-500">
              <span>Model: gemini-3-pro-image-preview</span>
              <span>Available sizes: 1K · 2K · 4K</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
