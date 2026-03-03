"use client";

import { Home, Search, Heart  } from "lucide-react";
import { useState } from "react";

const navItems = [
    { id: "map", label: "Map", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "saved", label: "Saved", icon: Heart },
];

export default function FloatingNavbar() {
    const [active, setActive] = useState("map");

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md">
            <div className="flex items-center justify-between bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl px-4 py-3 border border-gray-200">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            className="flex flex-col items-center justify-center gap-1 w-full cursor-pointer"
                        >
                            <Icon
                                size={22}
                                className={`transition-all ${isActive ? "text-blue-600 scale-110" : "text-gray-500"}`}
                            />
                            <span className={`text-xs ${isActive ? "text-blue-600 font-medium" : "text-gray-500"}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
