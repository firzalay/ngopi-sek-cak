"use client";

import { useEffect, useState, useId } from "react";
import { Map, MapPopup, useMap } from "@/components/ui/map";
import FloatingNavbar from "@/components/FloatingNavbar";

// Generate random cafe points around Surabaya
const cafeData = {
    type: "FeatureCollection" as const,
    features: [
        {
            type: "Feature" as const,
            properties: {
                id: 1,
                name: "Titik Koma Surabaya",
                address: "Jl. Ngagel Jaya Selatan No.45, Surabaya",
                category: "Cafe",
            },
            geometry: {
                type: "Point" as const,
                coordinates: [112.7489, -7.281],
            },
        },
        {
            type: "Feature" as const,
            properties: {
                id: 2,
                name: "Caturra Espresso",
                address: "Jl. Anjasmoro No.32, Surabaya",
                category: "Cafe",
            },
            geometry: {
                type: "Point" as const,
                coordinates: [112.7342, -7.2662],
            },
        },
        {
            type: "Feature" as const,
            properties: {
                id: 3,
                name: "Libreria Eatery",
                address: "Jl. Ngagel Jaya Selatan No.3, Surabaya",
                category: "Cafe & Eatery",
            },
            geometry: {
                type: "Point" as const,
                coordinates: [112.7505, -7.2805],
            },
        },
        {
            type: "Feature" as const,
            properties: {
                id: 4,
                name: "Historica Coffee",
                address: "Jl. Sumatera No.40, Surabaya",
                category: "Cafe",
            },
            geometry: {
                type: "Point" as const,
                coordinates: [112.7463, -7.2658],
            },
        },
        {
            type: "Feature" as const,
            properties: {
                id: 5,
                name: "Volks Coffee",
                address: "Jl. Raya Darmo Permai I, Surabaya",
                category: "Cafe",
            },
            geometry: {
                type: "Point" as const,
                coordinates: [112.7005, -7.2765],
            },
        },
    ],
};

interface SelectedPoint {
    id: number;
    name: string;
    category: string;
    address: string;
    coordinates: [number, number];
}
function MarkersLayer() {
    const { map, isLoaded } = useMap();
    const id = useId();
    const sourceId = `markers-source-${id}`;
    const layerId = `markers-layer-${id}`;
    const [selectedPoint, setSelectedPoint] = useState<SelectedPoint | null>(null);

    useEffect(() => {
        if (!map || !isLoaded) return;

        map.addSource(sourceId, {
            type: "geojson",
            data: cafeData,
        });

        map.addLayer({
            id: layerId,
            type: "circle",
            source: sourceId,
            paint: {
                "circle-radius": 6,
                "circle-color": "#3b82f6",
                "circle-stroke-width": 2,
                "circle-stroke-color": "#ffffff",
                // add more paint properties here to customize the appearance of the markers
            },
        });

        const handleClick = (
            e: maplibregl.MapMouseEvent & {
                features?: maplibregl.MapGeoJSONFeature[];
            },
        ) => {
            if (!e.features?.length) return;

            const feature = e.features[0];
            const coords = (feature.geometry as GeoJSON.Point).coordinates as [number, number];

            setSelectedPoint({
                id: feature.properties?.id,
                name: feature.properties?.name,
                category: feature.properties?.category,
                address: feature.properties?.address,
                coordinates: coords,
            });
        };

        const handleMouseEnter = () => {
            map.getCanvas().style.cursor = "pointer";
        };

        const handleMouseLeave = () => {
            map.getCanvas().style.cursor = "";
        };

        map.on("click", layerId, handleClick);
        map.on("mouseenter", layerId, handleMouseEnter);
        map.on("mouseleave", layerId, handleMouseLeave);

        return () => {
            map.off("click", layerId, handleClick);
            map.off("mouseenter", layerId, handleMouseEnter);
            map.off("mouseleave", layerId, handleMouseLeave);

            try {
                if (map.getLayer(layerId)) map.removeLayer(layerId);
                if (map.getSource(sourceId)) map.removeSource(sourceId);
            } catch {
                // ignore cleanup errors
            }
        };
    }, [map, isLoaded, sourceId, layerId]);

    return (
        <>
            {selectedPoint && (
                <MapPopup
                    longitude={selectedPoint.coordinates[0]}
                    latitude={selectedPoint.coordinates[1]}
                    onClose={() => setSelectedPoint(null)}
                    closeOnClick={false}
                    focusAfterOpen={false}
                    offset={10}
                    closeButton
                >
                    <div className="min-w-45">
                        <p className="font-semibold">{selectedPoint.name}</p>
                        <p className="text-sm">{selectedPoint.category}</p>
                        <p className="text-xs text-muted-foreground mt-1">{selectedPoint.address}</p>
                    </div>
                </MapPopup>
            )}
        </>
    );
}

export default function Home() {
    return (
        <div className="h-screen w-full">
            <Map center={[112.7521, -7.2575]} zoom={13}>
                <MarkersLayer />
            </Map>

            <FloatingNavbar />
        </div>
    );
}
