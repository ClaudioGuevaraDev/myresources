import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Resources',
  description: 'Mis recursos para el desarrollo de software',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='bg-gray-900 w-full h-full min-h-screen text-white'>
          <div className='container mx-auto p-5 min-h-screen'>{children}</div>
        </div>
      </body>
    </html>
  );
}
