import '../styles/components/Footer.css';

interface FooterProps {
    className?: string;
}

export const Footer = ({ className }: FooterProps) => {
    return (
        <footer className={`bg-gray-900 border-t border-gray-800 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <p className="text-gray-400 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} Helldivers 2 Loadout Builder.
                        <span className="block md:inline mt-1 md:mt-0 md:ml-2">
              Not affiliated with Arrowhead Game Studios.
            </span>
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="footer-link text-gray-400 text-sm">
                            Privacy
                        </a>
                        <a href="#" className="footer-link text-gray-400 text-sm">
                            Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};