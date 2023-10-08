import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';

// eslint-disable-next-line new-cap
const inter = Inter({subsets: ['latin']});

const title = 'React Knob Headless';
const description = 'Unstyled & accessible knob primitive for React';
const images = [
  {
    url: '/og_image.png',
    alt: description,
    width: 1200,
    height: 630,
  },
];

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: title,
    images,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images,
  },
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} bg-stone-950 text-stone-50 selection:bg-sky-700`}
      >
        {children}
      </body>
    </html>
  );
}
