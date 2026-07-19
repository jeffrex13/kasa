import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  Heart,
  MapPin,
  ShieldCheck,
  Clock,
  Zap,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/LoginModal";
import { ImageLightbox } from "@/components/ImageLightbox";
import { Badge } from "@/components/ui/badge";
import { MOCK_LISTINGS } from "@/data/mockListings";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const ICON_MAP: Record<string, React.ReactNode> = {
  Clock: <Clock className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
};

export default function PropertyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const property = MOCK_LISTINGS.find((listing) => listing.id === id);

  if (!property) return null;

  return (
    <div className="min-h-screen bg-[#f9f8f4] pb-28 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto w-full md:pt-6 md:px-6">
        <div className="relative w-full h-[35vh] md:h-[40vh] bg-slate-200 md:rounded-[2.5rem] overflow-hidden shadow-lg">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover cursor-zoom-in"
            onClick={() => setLightboxOpen(true)}
          />

          <div className="absolute top-6 left-4 right-4 flex justify-between">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 text-slate-900" />
            </button>
            <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors cursor-pointer">
              <Heart className="w-5 h-5 text-slate-900" />
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 -mt-6 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-orange-100/50">
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none mb-2 px-3 py-0">
              {property.gender}
            </Badge>
            <h1 className="text-2xl font-extrabold text-slate-900 mb-0 leading-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-1 text-slate-500 text-sm font-medium">
              <MapPin className="w-4 h-4 text-orange-600" />
              {property.location}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-3">
              Description
            </h3>
            <p className="text-slate-600 leading-relaxed text-[16px] font-medium">
              {property.description}
            </p>
          </div>

          <div className="flex items-center justify-between bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-12 bg-[#e6cbb4] rounded-full flex items-center justify-center font-bold text-white text-xl">
                {property.landlord.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">
                  Managed by {property.landlord}
                </h3>
                <p className="text-sm text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-blue-500" /> Verified
                  Property Manager
                </p>
              </div>
            </div>
          </div>

          {/* --- LEAFLET MAP SECTION --- */}
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 mb-3">
              Location
            </h3>
            <p className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-orange-600" />
              {property.location}
            </p>

            <div className="w-full h-64 md:h-96 bg-slate-100 rounded-[1.25rem] overflow-hidden shadow-sm border border-slate-200/60 relative z-0">
              <MapContainer
                center={[property.lat, property.lng]}
                zoom={15}
                scrollWheelZoom={false}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={[property.lat, property.lng]}>
                  <Popup className="custom-popup">
                    <div className="font-sans min-w-[150px]">
                      <h4 className="font-bold text-sm text-slate-900 !m-0 !mb-1 leading-tight">
                        {property.title}
                      </h4>
                      <p className="text-orange-600 font-extrabold text-base !m-0">
                        ₱{property.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500 !m-0 !mt-1">
                        {property.location}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-0 md:pt-12">
          <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
            The Fine Print
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {property.rules.map((rule, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100"
              >
                <div className="text-orange-600 bg-orange-50 p-2 rounded-lg">
                  {ICON_MAP[rule.icon]}
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  {rule.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 z-50">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Monthly Rent
            </p>
            <span className="font-extrabold text-2xl text-slate-900">
              ₱{property.price.toLocaleString()}
            </span>
          </div>
          <Button
            onClick={() => setShowLoginModal(true)}
            size="lg"
            className="bg-[#df6c24] hover:bg-[#c95d1b] text-white font-bold rounded-2xl px-10 h-12 shadow-lg active:scale-95 transition-all"
          >
            Check Availability
          </Button>
        </div>
      </div>

      <LoginModal isOpen={showLoginModal} onClose={setShowLoginModal} />
      <ImageLightbox
        key={lightboxOpen ? 1 : 0}
        images={[property.image]}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
