import React from "react";
import { Code2, Rocket } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    {/* Left side - Made with love */}
                    <div className="flex items-center space-x-2">
                        <Code2 className="w-5 h-5 text-blue-500" />
                        <span className="text-sm">
                            Built with passion by{" "}
                            <span className="text-blue-500">Karienye</span>
                        </span>
                    </div>

                    {/* Right side - Copyright */}
                    <div className="flex items-center space-x-2">
                        <Rocket className="w-5 h-5 text-purple-500" />
                        <span className="text-sm">
                            © {currentYear} All rights reserved
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;