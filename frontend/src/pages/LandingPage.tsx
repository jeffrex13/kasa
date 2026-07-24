import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { SwipeDeck } from "@/components/SwipeDeck";
import { MOCK_LISTINGS } from "@/data/mockListings";

type ViewMode = "grid" | "swipe";

export default function LandingPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const handleCardClick = (id: string) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#f7f5ef] pb-10">
      <SearchBar />

      <nav className="sticky top-[73px] z-40 flex justify-center px-4 py-3">
        <div className="grid grid-cols-2 gap-1 rounded-full border border-slate-200 bg-white/90 p-1 shadow-lg backdrop-blur-md">
          <Button
            type="button"
            variant={viewMode === "grid" ? "default" : "ghost"}
            className={`h-10 rounded-full px-5 font-extrabold ${
              viewMode === "grid"
                ? "bg-slate-950 text-white hover:bg-slate-800"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
            onClick={() => setViewMode("grid")}
          >
            Explore
          </Button>
          <Button
            type="button"
            variant={viewMode === "swipe" ? "default" : "ghost"}
            className={`h-10 rounded-full px-5 font-extrabold ${
              viewMode === "swipe"
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
            onClick={() => setViewMode("swipe")}
          >
            Find a Match
          </Button>
        </div>
      </nav>

      <main>
        {viewMode === "grid" ? (
          <section className="mx-auto max-w-7xl px-4 pt-3 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {MOCK_LISTINGS.map((listing) => (
                <div
                  key={listing.id}
                  onClick={() => handleCardClick(listing.id)}
                  className="group relative flex cursor-pointer flex-col gap-3"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-slate-200">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3">
                      <Badge className="border-none bg-white/90 font-bold text-slate-900 shadow-sm">
                        {listing.gender}
                      </Badge>
                    </div>
                    <button
                      className="absolute right-3 top-3 z-10 p-1.5 transition-transform active:scale-90"
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                      aria-label="Save place"
                    >
                      <Heart className="h-6 w-6 text-white drop-shadow-md hover:fill-white/50" />
                    </button>
                  </div>

                  <div className="flex flex-col text-left">
                    <div className="flex items-start justify-between">
                      <h3 className="truncate pr-4 text-base font-bold text-slate-900">
                        {listing.location}
                      </h3>
                      <div className="flex items-center gap-1 text-sm font-medium text-slate-900">
                        <Star className="h-4 w-4 fill-slate-900" />
                        <span>{listing.rating}</span>
                      </div>
                    </div>
                    <p className="truncate text-sm text-slate-500">
                      {listing.title} · {listing.university}
                    </p>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-base font-bold text-slate-900">
                        ₱{listing.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-slate-500">/ mo</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <SwipeDeck listings={MOCK_LISTINGS} onOpenDetails={handleCardClick} />
        )}
      </main>
    </div>
  );
}
