import { useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/SearchBar";
import { MOCK_LISTINGS } from "@/data/mockListings";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="min-h-screen bg-white pb-10">
      <SearchBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {MOCK_LISTINGS.map((listing) => (
            <div
              key={listing.id}
              onClick={() => handleCardClick(listing.id)}
              className="group cursor-pointer flex flex-col gap-3 relative"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-slate-200">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/90 text-slate-900 shadow-sm font-bold border-none">
                    {listing.gender}
                  </Badge>
                </div>
                <button
                  className="absolute top-3 right-3 p-1.5 active:scale-90 transition-transform z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Heart className="w-6 h-6 text-white drop-shadow-md hover:fill-white/50" />
                </button>
              </div>

              {/* Text Info */}
              <div className="flex flex-col">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900 text-base truncate pr-4">
                    {listing.location}
                  </h3>
                  <div className="flex items-center gap-1 text-sm font-medium text-slate-900">
                    <Star className="w-4 h-4 fill-slate-900" />
                    <span>{listing.rating}</span>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-slate-500 text-sm truncate">
                    {listing.title} • {listing.university}
                  </p>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="font-bold text-slate-900 text-base">
                    ₱{listing.price.toLocaleString()}
                  </span>
                  <span className="text-slate-500 text-sm">/ mo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
