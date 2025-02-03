import '../styles/components/Header.css';
import '../styles/fonts/fs-sinclair-bold.otf'

interface HeaderProps {
    className?: string;
}

export const Header = ({ className }: HeaderProps) => {
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
                            <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Save Loadout
                            </button>
                            <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Load Loadout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};