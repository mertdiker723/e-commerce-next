import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

// Styles
import "./globals.css";

// Libs
import ReduxProvider from "@/lib/redux/provider";
import ReactQueryProvider from "@/lib/react-query/provider";

// Components
import NavbarWrapper from "@/common/Navbar/navbarWrapper";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ShopLocal",
    description:
        "ShopLocal is a platform for finding local products and supporting local businesses.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ReactQueryProvider>
                    <ReduxProvider>
                        <NavbarWrapper />
                        {children}
                        <Toaster position="top-right" />
                    </ReduxProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
