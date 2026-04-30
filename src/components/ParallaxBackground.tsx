type ParallaxLayer = {
  src: string;
  durationSec: number;
  opacity: number;
  blurPx?: number;
};

const DEFAULT_LAYERS: ParallaxLayer[] = [
  { src: '/base.png', durationSec: 42, opacity: 0.95 },
  { src: '/cloud-1.png', durationSec: 26, opacity: 0.55, blurPx: 0.5 },
  { src: '/cloud-2.png', durationSec: 18, opacity: 0.45, blurPx: 0.8 },
  { src: '/cloud-3.png', durationSec: 12, opacity: 0.35, blurPx: 1 },
];

export default function ParallaxBackground({ layers = DEFAULT_LAYERS }: { layers?: ParallaxLayer[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {layers.map((layer) => (
        <div
          key={layer.src}
          className="parallax-layer absolute inset-0"
          style={{
            backgroundImage: `url(${layer.src})`,
            animationDuration: `${layer.durationSec}s`,
            opacity: layer.opacity,
            filter: layer.blurPx ? `blur(${layer.blurPx}px)` : undefined,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
    </div>
  );
}
