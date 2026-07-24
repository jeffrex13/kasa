import { useMemo, useRef, useState } from "react";
import { Heart, Info, MapPin, RotateCcw, Star, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Property } from "@/data/mockListings";

type SwipeDirection = "left" | "right";

interface SwipeDeckProps {
  listings: Property[];
  onOpenDetails: (id: string) => void;
}

interface DragState {
  startX: number;
  startY: number;
  x: number;
  y: number;
  isDragging: boolean;
}

const SWIPE_THRESHOLD = 110;

export function SwipeDeck({ listings, onOpenDetails }: SwipeDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [savedPlaces, setSavedPlaces] = useState<Property[]>([]);
  const [lastAction, setLastAction] = useState<{
    listing: Property;
    direction: SwipeDirection;
  } | null>(null);
  const [leavingDirection, setLeavingDirection] =
    useState<SwipeDirection | null>(null);
  const [drag, setDrag] = useState<DragState>({
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    isDragging: false,
  });

  const deck = useMemo(
    () => listings.slice(activeIndex, activeIndex + 3),
    [activeIndex, listings],
  );
  const activeListing = deck[0];
  const cardRef = useRef<HTMLDivElement | null>(null);

  const voteIntent = drag.x > 24 ? "save" : drag.x < -24 ? "pass" : null;
  const rotation = Math.max(Math.min(drag.x / 18, 10), -10);

  function completeSwipe(direction: SwipeDirection) {
    if (!activeListing || leavingDirection) return;

    setLeavingDirection(direction);
    setLastAction({ listing: activeListing, direction });

    if (direction === "right") {
      setSavedPlaces((current) => {
        if (current.some((place) => place.id === activeListing.id)) {
          return current;
        }

        return [...current, activeListing];
      });
    }

    window.setTimeout(() => {
      setActiveIndex((current) => current + 1);
      setDrag({ startX: 0, startY: 0, x: 0, y: 0, isDragging: false });
      setLeavingDirection(null);
    }, 220);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!activeListing || leavingDirection) return;

    cardRef.current?.setPointerCapture(event.pointerId);
    setDrag({
      startX: event.clientX,
      startY: event.clientY,
      x: 0,
      y: 0,
      isDragging: true,
    });
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.isDragging || leavingDirection) return;

    setDrag((current) => ({
      ...current,
      x: event.clientX - current.startX,
      y: event.clientY - current.startY,
    }));
  }

  function handlePointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.isDragging) return;

    cardRef.current?.releasePointerCapture(event.pointerId);

    if (drag.x > SWIPE_THRESHOLD) {
      completeSwipe("right");
      return;
    }

    if (drag.x < -SWIPE_THRESHOLD) {
      completeSwipe("left");
      return;
    }

    setDrag({ startX: 0, startY: 0, x: 0, y: 0, isDragging: false });
  }

  function undoLastAction() {
    if (!lastAction) return;

    setActiveIndex((current) => Math.max(0, current - 1));
    if (lastAction.direction === "right") {
      setSavedPlaces((current) =>
        current.filter((place) => place.id !== lastAction.listing.id),
      );
    }
    setLastAction(null);
  }

  if (!activeListing) {
    return (
      <section className="mx-auto flex min-h-[calc(100svh-98px)] w-full max-w-5xl flex-col items-center justify-center p-4 text-center">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-600">
            Discovery complete
          </p>
          <h1 className="my-3 text-3xl font-extrabold tracking-normal text-slate-950">
            {savedPlaces.length
              ? `${savedPlaces.length} saved place${savedPlaces.length === 1 ? "" : "s"}`
              : "No saved places yet"}
          </h1>
          <div className="space-y-3 text-left">
            {savedPlaces.map((place) => (
              <button
                key={place.id}
                onClick={() => onOpenDetails(place.id)}
                className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 text-left transition hover:bg-white hover:shadow-sm"
              >
                <img
                  src={place.image}
                  alt={place.title}
                  className="h-14 w-16 rounded-lg object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-extrabold text-slate-900">
                    {place.title}
                  </span>
                  <span className="block truncate text-xs font-semibold text-slate-500">
                    ₱{place.price.toLocaleString()} / mo · {place.location}
                  </span>
                </span>
              </button>
            ))}
          </div>
          <Button
            className="mt-5 h-11 w-full rounded-xl bg-orange-600 font-extrabold text-white hover:bg-orange-700"
            onClick={() => {
              setActiveIndex(0);
              setSavedPlaces([]);
              setLastAction(null);
            }}
          >
            Start Over
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto grid min-h-[calc(100svh-92px)] w-full max-w-6xl grid-cols-1 gap-6 px-4 py-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
      <div className="flex min-h-150 flex-col items-center justify-center">
        <div className="mb-4 w-full max-w-107.5 text-left">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-600">
            Find a Match
          </p>
          <h3 className="my-2 text-2xl font-extrabold tracking-normal text-slate-950">
            Swipe into your next rental
          </h3>
          <p className="text-sm font-semibold text-slate-500">
            Pass on places that miss, save the ones that feel right.
          </p>
        </div>

        <div className="relative h-135 w-full max-w-107.5 touch-none">
          {deck
            .map((listing, index) => {
              const isActive = index === 0;
              const depth = index;
              const translateY = isActive ? 0 : depth * 14;
              const scale = isActive ? 1 : 1 - depth * 0.045;
              const exitX =
                leavingDirection === "right"
                  ? 540
                  : leavingDirection === "left"
                    ? -540
                    : drag.x;
              const exitRotate =
                leavingDirection === "right"
                  ? 18
                  : leavingDirection === "left"
                    ? -18
                    : rotation;

              return (
                <div
                  key={listing.id}
                  ref={isActive ? cardRef : null}
                  onPointerDown={isActive ? handlePointerDown : undefined}
                  onPointerMove={isActive ? handlePointerMove : undefined}
                  onPointerUp={isActive ? handlePointerEnd : undefined}
                  onPointerCancel={isActive ? handlePointerEnd : undefined}
                  className={`absolute inset-0 overflow-hidden rounded-2xl border border-white/80 bg-white text-left shadow-2xl ${
                    isActive ? "cursor-grab active:cursor-grabbing" : ""
                  } ${drag.isDragging ? "" : "transition-all duration-300 ease-out"}`}
                  style={{
                    zIndex: 10 - index,
                    transform: isActive
                      ? `translate(${exitX}px, ${drag.y}px) rotate(${exitRotate}deg)`
                      : `translateY(${translateY}px) scale(${scale})`,
                    opacity: isActive || index < 2 ? 1 : 0,
                  }}
                >
                  {isActive && voteIntent && (
                    <div
                      className={`absolute top-7 z-20 rounded-xl border-4 px-4 py-2 text-2xl font-black uppercase tracking-[0.08em] ${
                        voteIntent === "save"
                          ? "right-6 rotate-12 border-emerald-500 text-emerald-500"
                          : "left-6 -rotate-12 border-rose-500 text-rose-500"
                      }`}
                    >
                      {voteIntent === "save" ? "Save" : "Pass"}
                    </div>
                  )}

                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="h-full w-full select-none object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/72 to-transparent p-5 pt-24 text-white">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <Badge className="border-none bg-white/95 px-3 text-slate-900">
                        {listing.gender}
                      </Badge>
                      <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-sm font-extrabold backdrop-blur-md">
                        <Star className="h-4 w-4 fill-white" />
                        {listing.rating}
                      </span>
                    </div>
                    <h2 className="mb-1 text-3xl font-black leading-tight tracking-normal">
                      {listing.title}
                    </h2>
                    <p className="flex items-center gap-1 text-sm font-bold text-white/85">
                      <MapPin className="h-4 w-4" />
                      {listing.location} · {listing.university}
                    </p>
                    <div className="mt-4 flex items-end justify-between gap-4">
                      <p className="text-2xl font-black">
                        ₱{listing.price.toLocaleString()}
                        <span className="text-sm font-bold text-white/70">
                          {" "}
                          / mo
                        </span>
                      </p>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-11 w-11 rounded-full bg-white text-slate-950 hover:bg-orange-50"
                        onClick={(event) => {
                          event.stopPropagation();
                          onOpenDetails(listing.id);
                        }}
                        aria-label="Open place details"
                      >
                        <Info className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
            .reverse()}
        </div>

        <div className="mt-5 grid grid-cols-[64px_76px_64px] items-center justify-center gap-4">
          <Button
            size="icon"
            variant="outline"
            className="h-14 w-14 rounded-full border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50"
            onClick={undoLastAction}
            disabled={!lastAction || Boolean(leavingDirection)}
            aria-label="Undo last swipe"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            className="h-16 w-16 rounded-full bg-rose-500 text-white shadow-lg hover:bg-rose-600"
            onClick={() => completeSwipe("left")}
            disabled={Boolean(leavingDirection)}
            aria-label="Pass on this place"
          >
            <X className="h-8 w-8" />
          </Button>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600"
            onClick={() => completeSwipe("right")}
            disabled={Boolean(leavingDirection)}
            aria-label="Save this place"
          >
            <Heart className="h-6 w-6 fill-white" />
          </Button>
        </div>
      </div>

      <aside className="hidden border-l border-slate-200 pl-6 pt-12 text-left lg:block">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
          Saved Places
        </p>
        <h2 className="mt-2 text-xl font-extrabold tracking-normal text-slate-950">
          {savedPlaces.length} match{savedPlaces.length === 1 ? "" : "es"}
        </h2>
        <div className="mt-5 space-y-3">
          {savedPlaces.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-200 p-4 text-sm font-semibold text-slate-500">
              Swipe right on a listing to keep it here.
            </p>
          ) : (
            savedPlaces.map((place) => (
              <button
                key={place.id}
                onClick={() => onOpenDetails(place.id)}
                className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition hover:border-orange-200 hover:shadow-md"
              >
                <img
                  src={place.image}
                  alt={place.title}
                  className="h-14 w-16 rounded-lg object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-extrabold text-slate-900">
                    {place.title}
                  </span>
                  <span className="block truncate text-xs font-semibold text-slate-500">
                    ₱{place.price.toLocaleString()} / mo
                  </span>
                </span>
              </button>
            ))
          )}
        </div>
      </aside>
    </section>
  );
}
