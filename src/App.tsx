import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useLoadoutStore} from './stores/loadoutStore';
import {DraggableItem} from './components/DraggableItem';
import {DropZone} from './components/DropZone';
import {useEffect} from "react";
import {TrashDropZone} from "./components/TrashDropZone";
import './App.css'
import {Header} from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";

function App() {
    const {slots, availableItems, selectedSlot, setSelectedSlot, fetchItems } = useLoadoutStore();

    const filteredItems = availableItems.filter(item =>
        !selectedSlot || item.type === selectedSlot
    );

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.slot, .sidebar')) {
                setSelectedSlot(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [setSelectedSlot]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="h-screen w-screen flex flex-col">
                <Header className="h-16 flex-shrink-0"/>

                {/* Centered Main Content Area */}
                <div className="flex-1 overflow-hidden flex items-center justify-center p-4">
                    <div className="w-[80vw] h-[80vh] max-w-[1200px] max-h-[800px] grid grid-cols-[256px_1fr] gap-8 bg-gray-950 rounded-xl p-8 shadow-2xl">
                        {/* Sidebar */}
                        <div className="overflow-y-auto pr-2 sidebar">
                            <h2 className="text-xl mb-4">Available Items</h2>
                            <div className="space-y-2 h-[calc(80vh-6rem)]">
                            {filteredItems.map((item) => (
                                <DraggableItem key={item.id} item={item}/>
                            ))}</div>
                            {selectedSlot && filteredItems.length === 0 && (
                                <p className="text-gray-400">No {selectedSlot} items available</p>
                            )}
                        </div>

                        {/* Loadout Area */}
                        <div className="flex flex-col overflow-hidden">
                            <h1 className="text-3xl mb-8">Helldivers 2 Loadout Builder</h1>
                            <div className="grid grid-cols-2 gap-4 flex-1 overflow-y-auto pb-4 slot p-1">
                                {slots.map((slot) => (
                                    <DropZone key={slot.type} slot={slot}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <TrashDropZone className="bottom-24 right-8"/>
                <Footer className="h-20 flex-shrink-0"/>
            </div>
        </DndProvider>
    );
}

export default App;