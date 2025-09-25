import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// Styles
import "./globals.css";

// Libs
import ReduxProvider from "@/lib/redux/provider";

// Components
import NavbarWrapper from "@/components/shared/NavbarWrapper";

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
    description: "ShopLocal is a platform for finding local products and supporting local businesses.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ReduxProvider>
                    <NavbarWrapper />
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}
