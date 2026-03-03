"use client";

import { useState } from "react";
import { X, Instagram } from "lucide-react";

interface Cafe {
    id: number;
    name: string;
    address: string;
    priceRange: string;
    instagram_name: string;
    instagram_link: string;
    wifi: boolean;
    smokingarea: boolean;
    musala: boolean;
    ac_available: boolean;
    colokoan_available: boolean;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const dummyCafes: Cafe[] = [
    {
        id: 1,
        name: "Titik Koma",
        address: "Sukolilo, Surabaya",
        priceRange: "20k - 40k",
        instagram_name: "@titikkoma",
        instagram_link: "https://instagram.com",
        wifi: true,
        smokingarea: true,
        musala: true,
        ac_available: true,
        colokoan_available: true,
    },
    {
        id: 2,
        name: "Kopi Nako",
        address: "Ngagel, Surabaya",
        priceRange: "25k - 50k",
        instagram_name: "@kopinako",
        instagram_link: "https://instagram.com",
        wifi: true,
        smokingarea: false,
        musala: false,
        ac_available: true,
        colokoan_available: true,
    },
    {
        id: 3,
        name: "Janji Jiwa Space",
        address: "Manyar, Surabaya",
        priceRange: "18k - 35k",
        instagram_name: "@janjijiwa",
        instagram_link: "https://instagram.com",
        wifi: false,
        smokingarea: false,
        musala: false,
        ac_available: true,
        colokoan_available: false,
    },
    {
        id: 4,
        name: "Dua Coffee",
        address: "Rungkut, Surabaya",
        priceRange: "30k - 60k",
        instagram_name: "@duacoffee",
        instagram_link: "https://instagram.com",
        wifi: true,
        smokingarea: true,
        musala: false,
        ac_available: false,
        colokoan_available: true,
    },
];

function Facility({ label, value }: { label: string; value: boolean }) {
    return (
        <div className="flex items-center justify-between border rounded-lg px-3 py-2">
            <span>{label}</span>
            <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                    value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                }`}
            >
                {value ? "Tersedia" : "Tidak Ada"}
            </span>
        </div>
    );
}

function FilterButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1 rounded-full border transition ${
                active ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-300"
            }`}
        >
            {label}
        </button>
    );
}

export default function SearchModal({ isOpen, onClose }: Props) {
    const [search, setSearch] = useState("");
    const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
    const [filters, setFilters] = useState({
        wifi: false,
        smokingarea: false,
        musalla: false,
        ac_available: false,
        colokoan_available: false,
    });

    if (!isOpen) return null;

    const filtered = dummyCafes
        .filter((cafe) => cafe.name.toLowerCase().includes(search.toLowerCase()))
        .filter((cafe) =>
            Object.entries(filters).every(([key, value]) => {
                if (!value) return true; 
                return cafe[key as keyof Cafe] === true;
            }),
        );

    const filterConfig = [
        { key: "wifi", label: "WiFi" },
        { key: "ac_available", label: "AC" },
        { key: "colokoan_available", label: "Colokan" },
        { key: "musalla", label: "Musala" },
        { key: "smokingarea", label: "Smoking Area" },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-[90%] max-w-lg max-h-[80vh] bg-white rounded-2xl shadow-xl p-6 overflow-y-auto relative">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
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

                        <div className="flex flex-wrap gap-2 mb-4 text-sm">
                            {filterConfig.map((filter) => (
                                <FilterButton
                                    key={filter.key}
                                    label={filter.label}
                                    active={filters[filter.key as keyof typeof filters]}
                                    onClick={() =>
                                        setFilters({
                                            ...filters,
                                            [filter.key]: !filters[filter.key as keyof typeof filters],
                                        })
                                    }
                                />
                            ))}
                        </div>

                        {/* Cafe List */}
                        <div className="space-y-3">
                            {filtered.map((cafe) => (
                                <div
                                    key={cafe.id}
                                    onClick={() => setSelectedCafe(cafe)}
                                    className="p-4 border rounded-xl hover:bg-gray-50 cursor-pointer transition"
                                >
                                    <p className="font-medium">{cafe.name}</p>
                                    <p className="text-sm text-gray-500">{cafe.address}</p>
                                    <p className="text-sm text-gray-80 mt-2">Harga: {cafe.priceRange}</p>
                                    <a
                                        href={cafe.instagram_link}
                                        className="text-sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        target="_blank"
                                    >
                                        Instagram: <span className="hover:text-blue-500">{cafe.instagram_name}</span>
                                    </a>
                                </div>
                            ))}

                            {filtered.length === 0 && <p className="text-sm text-gray-400">Tidak ditemukan cafe.</p>}
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold mb-2">{selectedCafe.name}</h2>

                        <p className="text-sm text-gray-500 mb-3">{selectedCafe.address}</p>

                        <div className="text-sm mb-4">
                            <p className="font-medium">Harga</p>
                            <p className="text-gray-700">{selectedCafe.priceRange}</p>
                        </div>

                        {/* Instagram */}
                        <div className="mb-4">
                            <a
                                href={selectedCafe.instagram_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-pink-600 hover:underline text-sm"
                            >
                                <Instagram size={16} />
                                {selectedCafe.instagram_name}
                            </a>
                        </div>

                        {/* Fasilitas */}
                        <div className="border-t pt-4">
                            <p className="font-medium mb-3">Fasilitas</p>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <Facility label="WiFi" value={selectedCafe.wifi} />
                                <Facility label="Smoking Area" value={selectedCafe.smokingarea} />
                                <Facility label="Musala" value={selectedCafe.musala} />
                                <Facility label="AC" value={selectedCafe.ac_available} />
                                <Facility label="Colokan" value={selectedCafe.colokoan_available} />
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedCafe(null)}
                            className="mt-6 text-blue-600 text-sm hover:underline"
                        >
                            ← Kembali ke daftar
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
