import './style.css';
import {type Metadata} from 'next';
import {Inter} from 'next/font/google';

// eslint-disable-next-line new-cap
const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'SOAN',
  description: 'SOAN - Experimental DAW',
};

function RootLayout({children}: {readonly children: React.ReactNode}) {
  return (
    <html lang='en' className={inter.className}>
      {children}
    </html>
  );
}

export default RootLayout;
