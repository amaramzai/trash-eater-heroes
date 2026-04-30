import { useState } from 'react';

type BrandMarkProps = {
  src?: string;
  alt?: string;
  className?: string;
};

export default function BrandMark({
  src = '/brand.png',
  alt = 'Brand',
  className,
}: BrandMarkProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={className}>
      {!hasError && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
          onError={() => setHasError(true)}
        />
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

