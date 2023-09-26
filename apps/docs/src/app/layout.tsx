import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'React Knob Headless',
  description: 'Headless knob component for React',
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-stone-950 text-stone-100`}>
        {children}
      </body>
    </html>
  );
}
