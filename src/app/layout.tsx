
import type {Metadata} from 'next';
import { Poppins } from 'next/font/google'; // Import Poppins
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// Configure Poppins font
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'], // Include desired weights
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Likhit - AI Letter Generator',
  description: 'Generate professional letters with AI for various purposes.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}> {/* Apply Poppins variable */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
