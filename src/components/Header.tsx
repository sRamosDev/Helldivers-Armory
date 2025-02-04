import '../styles/components/Header.css';
import '../styles/fonts/fs-sinclair-bold.otf'
import {useLoadoutStore} from "../stores/loadoutStore.ts";
import Turnstile from 'react-turnstile';
import {useState} from "react";

interface HeaderProps {
    className?: string;
}

export const Header = ({ className }: HeaderProps) => {
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [loadoutName, setLoadoutName] = useState('');
    const saveLoadout = useLoadoutStore(state => state.saveLoadout);
    const clearAllSlots = useLoadoutStore(state => state.clearAllSlots);
    const [showConfirm, setShowConfirm] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
    const [isTurnstileLoading, setIsTurnstileLoading] = useState(true);

    const handleSave = async () => {
        if (!turnstileToken || !loadoutName.trim()) return;
        if (!loadoutName.trim()) return;
        try {
            await saveLoadout(loadoutName, turnstileToken);
            setShowSaveDialog(false);
            setLoadoutName('');
            setTurnstileToken(null);
        } catch (error) {
            console.error('Save failed:', error);
            setTurnstileToken(null); // Reset token on failure
        }
    };


    return (
        <header className={`bg-gray-900 border-b border-gray-800 ${className}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-xl text-[#DACB1C] hover:text-yellow-400 transition-colors duration-200" style={{ fontFamily: 'fs-sinclair-bold' }}>
                            Helldivers 2 Loadout Builder
                        </h1>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setShowConfirm(true)}
                                className="text-red-400 hover:text-red-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Clear All
                            </button>

                            {showConfirm && (
                                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                                    <div className="bg-gray-800 p-6 rounded-lg max-w-sm">
                                        <p className="mb-4">Are you sure you want to clear all slots?</p>
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                onClick={() => setShowConfirm(false)}
                                                className="px-4 py-2 text-gray-300 hover:text-white"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => {
                                                    clearAllSlots();
                                                    setShowConfirm(false);
                                                }}
                                                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md"
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => setShowSaveDialog(true)}
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Save Loadout
                            </button>
                            <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Load Loadout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {showSaveDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg max-w-sm w-full mx-4 z-999">
                        <h3 className="text-lg font-bold mb-4">Save Loadout</h3>
                        <input
                            type="text"
                            placeholder="Loadout name"
                            value={loadoutName}
                            onChange={(e) => setLoadoutName(e.target.value)}
                            className="w-full mb-4 p-2 bg-gray-700 rounded-md text-white"
                        />

                        <div className="mb-4">
                            <Turnstile
                                sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                                onVerify={setTurnstileToken}
                                onLoad={() => setIsTurnstileLoading(false)}
                                onError={() => setIsTurnstileLoading(true)}
                                onExpire={() => setTurnstileToken(null)}
                                theme="dark"
                                size="invisible"
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowSaveDialog(false)}
                                className="px-4 py-2 text-gray-300 hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md
                  disabled:opacity-50 transition-colors"
                                disabled={!loadoutName.trim() || !turnstileToken || isTurnstileLoading}
                            >
                                {isTurnstileLoading ? 'Verifying...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};