import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LinkedIn Job Copilot',
  description: 'Turn any LinkedIn job into ATS resume + outreach + prep',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}

