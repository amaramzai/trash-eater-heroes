import { useState } from 'react';

type BrandMarkProps = {
  src?: string;
  webpSrc?: string;
  alt?: string;
  className?: string;
};

export default function BrandMark({
  src = '/brand.png',
  webpSrc = '/brand.webp',
  alt = 'Brand',
  className,
}: BrandMarkProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={className}>
      {!hasError && (
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain"
            decoding="async"
            loading="eager"
            fetchPriority="high"
            onError={() => setHasError(true)}
          />
        </picture>
      )}
      {hasError && (
        <div className="w-full h-full rounded-2xl border border-white/15 bg-white/5 flex items-center justify-center">
          <span className="text-xs tracking-[0.35em] text-white/60 font-bold">
            PNG LOGO
          </span>
        </div>
      )}
    </div>
  );
}
