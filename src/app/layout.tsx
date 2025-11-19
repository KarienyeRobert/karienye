import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    display: "swap",
});

export const metadata = {
    title: "Robert Karienye | Full Stack Developer",
    description: "Portfolio website for Robert Karienye - Full Stack Developer specializing in React, Next.js, Node.js, and mobile app development",
    keywords: ["Robert Karienye", "Full Stack Developer", "React", "Next.js", "Node.js", "Portfolio"],
    authors: [{ name: "Robert Karienye" }],
    openGraph: {
        title: "Robert Karienye | Full Stack Developer",
        description: "Portfolio website for Robert Karienye - Full Stack Developer",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
            <body className={`${inter.className} antialiased`}>
                <Analytics />
                {children}
            </body>
        </html>
    );
}

