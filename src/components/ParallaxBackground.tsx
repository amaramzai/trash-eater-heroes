type ParallaxLayer = {
  src: string;
  durationSec: number;
  opacity: number;
};

function toWebp(pngOrAny: string) {
  return pngOrAny.replace(/\.png$/i, '.webp');
}

const DEFAULT_LAYERS: ParallaxLayer[] = [
  { src: '/base.png', durationSec: 42, opacity: 0.95 },
  { src: '/cloud-1.png', durationSec: 26, opacity: 0.55 },
  { src: '/cloud-2.png', durationSec: 18, opacity: 0.45 },
  { src: '/cloud-3.png', durationSec: 12, opacity: 0.35 },
];

export default function ParallaxBackground({ layers = DEFAULT_LAYERS }: { layers?: ParallaxLayer[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {layers.map((layer) => (
        <div
          key={layer.src}
          className="parallax-layer absolute inset-0"
          style={{
            backgroundImage: `image-set(url(${toWebp(layer.src)}) type("image/webp"), url(${layer.src}) type("image/png"))`,
            animationDuration: `${layer.durationSec}s`,
            opacity: layer.opacity,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
    </div>
  );
}
