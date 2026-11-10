import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import { RestoNavbar } from '@/components/layout/RestoNavbar';
import { RestoFooter } from '@/components/layout/RestoFooter';

export const metadata: Metadata = {
  title: 'RestoChain OS | Enterprise Multi-Location Restaurant Chain OS & Cloud POS',
  description: 'نظام سحابي متكامل لإدارة سلاسل المطاعم: نقاط بيع كبرى (Cloud POS)، شاشات المطبخ الذكية (KDS)، إدارة المخزون وتكلفة الوجبات، ورديات الموظفين وتقارير Z.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 antialiased selection:bg-rose-600 selection:text-white transition-colors duration-200">
        <LanguageProvider>
          <RestoNavbar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <RestoFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
