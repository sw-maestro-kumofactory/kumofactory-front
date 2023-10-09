import '@/src/app/globals.css';
import { Inter } from 'next/font/google';

import { Header } from '@/src/components/Layout/Header';
import '@fortawesome/fontawesome-svg-core/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Kumo Factory',
  description: 'Easy Architecture Management Tool',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={(inter.className, 'bg-[#FCF7F4]')}>
        <Header />
        <div className='w-full h-full pt-[50px]'>{children}</div>
      </body>
    </html>
  );
}
