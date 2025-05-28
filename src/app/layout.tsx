
import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Likhit - AI Letter Generator',
  description: 'Generate professional letters with AI for various purposes.',
};

// Define an interface for the layout props
interface RootLayoutProps {
  children: React.ReactNode;
  params: { [key: string]: string | string[] | undefined }; // params is standard for layouts
}

export default function RootLayout({
  children,
  params, // params is received but not actively used in the root layout logic
}: RootLayoutProps) {
  // For the root layout, 'params' will be an empty object: {}
  // The Next.js warning "params are being enumerated" can occur if Next.js dev tools
  // or error overlays try to inspect props by enumerating them.
  // Accessing a specific key (e.g., params.someKey) is the recommended way to "use" params,
  // but there are no keys to access in an empty params object for the root layout.
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
