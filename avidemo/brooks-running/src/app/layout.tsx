import './globals.scss';

// Loaded as a <link> (not a Sass @import): Next.js drops @import rules that are not at the very
// top of the bundled CSS, so the theme fonts in _fonts.scss never reached the browser.
const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@700;800&display=swap';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={GOOGLE_FONTS_URL} />
      </head>
      <body>{children}</body>
    </html>
  );
}
