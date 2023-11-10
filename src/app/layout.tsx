import '@/src/app/globals.css';
import { Inter, Noto_Sans_KR } from 'next/font/google';

import { Header } from '@/src/components/Layout/Header';
import '@fortawesome/fontawesome-svg-core/styles.css';

const inter = Inter({ subsets: ['latin'] });
const notoSansKr = Noto_Sans_KR({
  // preload: true, 기본값
  subsets: ['latin'], // 또는 preload: false
  weight: ['100', '400', '700', '900'], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});

export const metadata = {
  title: 'Kumo Factory',
  description: 'Easy Architecture Management Tool',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={notoSansKr.className}>
        <Header />
        <div className='w-full h-full pt-[50px]'>{children}</div>
      </body>
    </html>
  );
}
