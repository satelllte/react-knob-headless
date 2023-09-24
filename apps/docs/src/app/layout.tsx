import './style.css';
import clsx from 'clsx';
import {type Metadata} from 'next';
import {Inter} from 'next/font/google';

// eslint-disable-next-line new-cap
const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'React Knob Headless',
  description: 'Headless knob component for React',
};

function RootLayout({children}: {readonly children: React.ReactNode}) {
  return (
    <html
      lang='en'
      className={clsx(inter.className, 'bg-stone-950 text-stone-100')}
    >
      {children}
    </html>
  );
}

export default RootLayout;
