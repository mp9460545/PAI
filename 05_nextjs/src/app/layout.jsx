import Script from 'next/script';

export const metadata = {
  title: 'Kalkulator Kredytowy',
  description: 'Oblicz miesięczną ratę kredytu',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <head>
        <link rel="stylesheet" href="/assets/css/main.css" />
        <style>{`html { scroll-behavior: smooth; }`}</style>
      </head>
      <body className="homepage is-preload">
        {children}
        <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/jquery.dropotron.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/browser.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/breakpoints.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/util.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
