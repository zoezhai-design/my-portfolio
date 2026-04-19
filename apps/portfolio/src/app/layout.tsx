import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zoe Zhai — Product Designer',
  description: 'Product designer specialising in AI-native workflows, enterprise tools, and design systems.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
