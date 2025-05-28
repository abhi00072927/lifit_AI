
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

export default function RootLayout({
  children,
  params, // Explicitly include params in the props
}: Readonly<{
  children: React.ReactNode;
  params: { [key: string]: string | string[] | undefined }; // Define type for params
}>) {
  // Although params is not used in the component's logic,
  // explicitly defining it here. For the root route, params will be an empty object.
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
