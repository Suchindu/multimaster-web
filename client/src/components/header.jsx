import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-blue-800 text-white py-4">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="text-xl font-bold">
                    Multimaster
                </Link>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/about" className="hover:text-gray-300">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/services" className="hover:text-gray-300">
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-gray-300">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
