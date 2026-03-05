import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WoC Starter',
  description: 'Website Over Coffee — built with TinaCMS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
