import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, prev, next]);

  if (!isOpen) return null;

  const hasMultiple = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      {hasMultiple && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium tabular-nums">
          {current + 1} / {images.length}
        </div>
      )}

      {/* Prev arrow */}
      {hasMultiple && (
        <button
          className="absolute left-4 w-11 h-11 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={current}
          src={images[current]}
          alt={`Image ${current + 1}`}
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl select-none"
          draggable={false}
        />
      </div>

      {/* Next arrow */}
      {hasMultiple && (
        <button
          className="absolute right-4 w-11 h-11 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Dot indicators */}
      {hasMultiple && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(i);
              }}
              aria-label={`Go to image ${i + 1}`}
              className={`rounded-full transition-all duration-200 ${
                i === current
                  ? "w-5 h-2 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
