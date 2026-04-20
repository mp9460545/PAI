import Script from 'next/script';
import './custom.css';

export const metadata = {
  title: 'Kalkulator Kredytowy',
  description: 'Oblicz miesięczną ratę kredytu',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <head>
        <link rel="stylesheet" href="/assets/css/main.css" />
      </head>
      <body className="homepage is-preload">
        {children}
        <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/jquery.dropotron.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/browser.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/breakpoints.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/util.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
        <Script id="scroll-nav" strategy="afterInteractive">{`
          (function() {
            window.addEventListener('scroll', function() {
              var header = document.getElementById('header');
              if (!header) return;
              if (window.scrollY > 60) {
                header.classList.add('scrolled');
              } else {
                header.classList.remove('scrolled');
              }
            }, { passive: true });
          })();
        `}</Script>
      </body>
    </html>
  );
}
