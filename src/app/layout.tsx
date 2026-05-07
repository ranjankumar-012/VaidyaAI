import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from '@/components/LanguageProvider';

export const metadata: Metadata = {
  title: 'VaidyaAI',
  description: 'A multilingual health chatbot for India.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <head />
      <body className="font-body antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}
