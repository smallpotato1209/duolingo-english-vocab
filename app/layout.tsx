import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'English Quest',
  description: 'A Duolingo-inspired English learning application with a personalised vocabulary bank and Chinese support.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
