import { Map, MapControls } from "@/components/ui/map";
import { Card } from "@/components/ui/card";

export default function Home() {
    return (
        <>
            <Card className="h-screen p-0 rounded-none border-none overflow-hidden">
                <Map center={[-74.006, 40.7128]} zoom={10}>
                    <MapControls />
                </Map>
            </Card>
        </>
    );
}
