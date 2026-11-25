import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  caption?: string;
  aspectClass?: string;
  className?: string;
  priority?: boolean;
  accentColor?: string;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  caption,
  aspectClass = 'aspect-[4/3]',
  className = '',
  priority = false,
  accentColor = '#702F3B',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure className={`group ${className}`}>
      <div
        className={`relative w-full overflow-hidden bg-[#F5F0E6] border-2 border-[#292725] p-1.5 bg-[#F8F6F1] ${aspectClass}`}
      >
        <div className="relative w-full h-full overflow-hidden border border-[#292725]/40">
          {!hasError ? (
            <img
              src={src}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              referrerPolicy="no-referrer"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
                isLoaded ? 'opacity-100' : 'opacity-90'
              }`}
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-[#292725]"
              style={{
                background:
                  'linear-gradient(135deg, #F5F0E6 0%, #E9DCD8 50%, #DCE6E1 100%)',
              }}
            >
              <BookOpen
                className="w-8 h-8 stroke-[1.25] mb-3"
                style={{ color: accentColor }}
              />
              <span className="font-editorial italic text-2xl text-[#292725] max-w-xs leading-tight">
                {alt}
              </span>
              <span className="font-mono-num text-[11px] uppercase tracking-widest text-[#292725]/70 mt-2">
                Vellune Archival Plate
              </span>
            </div>
          )}
        </div>
      </div>
      {caption && (
        <figcaption className="flex items-baseline gap-2 text-xs font-prose italic text-[#493A32] mt-3 leading-relaxed border-l-2 border-[#702F3B] pl-3">
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
};
