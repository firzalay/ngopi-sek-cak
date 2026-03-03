"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Cafe {
  id: number;
  name: string;
  address: string;
  priceRange: string;
  rating: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const dummyCafes: Cafe[] = [
  {
    id: 1,
    name: "Titik Koma",
    address: "Ngagel, Surabaya",
    priceRange: "20k - 40k",
    rating: 4.6,
  },
  {
    id: 2,
    name: "Caturra Espresso",
    address: "Anjasmoro, Surabaya",
    priceRange: "25k - 50k",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Historica Coffee",
    address: "Sumatera, Surabaya",
    priceRange: "18k - 35k",
    rating: 4.5,
  },
];

export default function SearchModal({ isOpen, onClose }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);

  if (!isOpen) return null;

  const filtered = dummyCafes.filter((cafe) =>
    cafe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-[90%] max-w-lg max-h-[80vh] bg-white rounded-2xl shadow-xl p-6 overflow-y-auto relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        {!selectedCafe ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Search Cafe</h2>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Cari cafe di Surabaya..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Cafe List */}
            <div className="space-y-3">
              {filtered.map((cafe) => (
                <div
                  key={cafe.id}
                  onClick={() => setSelectedCafe(cafe)}
                  className="p-4 border rounded-xl hover:bg-gray-50 cursor-pointer transition"
                >
                  <p className="font-medium">{cafe.name}</p>
                  <p className="text-sm text-gray-500">
                    {cafe.address}
                  </p>
                  <p className="text-xs mt-1">
                    ⭐ {cafe.rating} • {cafe.priceRange}
                  </p>
                </div>
              ))}

              {filtered.length === 0 && (
                <p className="text-sm text-gray-400">
                  Tidak ditemukan cafe.
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-3">
              {selectedCafe.name}
            </h2>

            <p className="text-sm text-gray-500 mb-2">
              {selectedCafe.address}
            </p>

            <p className="mb-1">⭐ Rating: {selectedCafe.rating}</p>
            <p>💰 Harga: {selectedCafe.priceRange}</p>

            <button
              onClick={() => setSelectedCafe(null)}
              className="mt-4 text-blue-600 text-sm"
            >
              ← Kembali ke daftar
            </button>
          </>
        )}
      </div>
    </div>
  );
}