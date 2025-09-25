import Link from "next/link";

import {
    ShoppingBagIcon,
    HeartIcon,
    PhoneIcon,
    EnvelopeIcon,
} from "@heroicons/react/24/outline";
import Button from "@/common/Button";

const HomePage = () => {
    return (
        <div className="flex flex-col bg-gray-50" style={{ height: 'calc(100vh - 64px)' }}>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white flex-grow flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">
                            ShopLocal
                        </h1>
                        <p className="text-lg md:text-xl mb-6 opacity-90">
                            Discover local products in your neighborhood. Call and buy directly from small businesses.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/product">
                                <Button
                                    label="Find Local Products"
                                    customClassName="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold transition-colors"
                                    icon={<ShoppingBagIcon className="w-4 h-4" />}
                                />
                            </Link>
                            <Link href="/favorites">
                                <Button
                                    label="My Saved Items"
                                    customClassName="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-2 rounded-lg font-semibold transition-colors"
                                    icon={<HeartIcon className="w-4 h-4" />}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Company Info */}
                        <div>
                            <h3 className="text-lg font-bold mb-2">ShopLocal</h3>
                            <p className="text-gray-300 text-sm">
                                Connect with local businesses in your neighborhood. Find products nearby and support your community.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-sm font-semibold mb-2 text-gray-300">Explore</h4>
                            <div className="flex flex-wrap gap-3 text-sm">
                                <Link href="/product" className="text-gray-400 hover:text-white transition-colors">
                                    Local Products
                                </Link>
                                <Link href="/favorites" className="text-gray-400 hover:text-white transition-colors">
                                    Saved Items
                                </Link>
                                <Link href="/register" className="text-gray-400 hover:text-white transition-colors">
                                    Join Community
                                </Link>
                                <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
                                    Login
                                </Link>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-sm font-semibold mb-2 text-gray-300">Contact</h4>
                            <div className="space-y-1 text-sm">
                                <div className="flex items-center space-x-2">
                                    <PhoneIcon className="w-3 h-3 text-gray-400" />
                                    <span className="text-gray-400">+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <EnvelopeIcon className="w-3 h-3 text-gray-400" />
                                    <span className="text-gray-400">support@ecommerce.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-4 pt-4 text-center">
                        <p className="text-gray-400 text-xs">
                            © {new Date().getFullYear()} ShopLocal. Supporting local businesses and communities.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
