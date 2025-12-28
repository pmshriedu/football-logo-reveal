import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Football Logo Reveal Ceremony | Experience the Excitement",
  description:
    "Join the thrilling football logo reveal ceremony. Discover new team logos, fixtures, and celebrate the start of the football season with interactive reveals and animations.",
  keywords: [
    "football",
    "logo reveal",
    "team logos",
    "fixtures",
    "ceremony",
    "sports",
    "soccer",
  ],
  authors: [{ name: "Football Logo Reveal Team" }],
  metadataBase: new URL("https://football-logo-reveal.com"), // Placeholder URL - update with actual domain
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicons/favicon.ico",
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: "/favicons/site.webmanifest",
  openGraph: {
    title: "Football Logo Reveal Ceremony",
    description:
      "Experience the excitement of football logo reveals and fixture announcements.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Football Logo Reveal Ceremony",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Football Logo Reveal Ceremony",
    description:
      "Join the thrilling football logo reveal ceremony and discover new team identities.",
    images: ["/logo.png"],
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "Football Logo Reveal Ceremony",
              description:
                "Experience the thrilling reveal of football team logos and fixtures in an interactive ceremony.",
              startDate: "2025-12-28", // Using current date as example
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode:
                "https://schema.org/OnlineEventAttendanceMode",
              location: {
                "@type": "VirtualLocation",
                url: "https://football-logo-reveal.com", // Placeholder URL
              },
              organizer: {
                "@type": "Organization",
                name: "Football Logo Reveal Team",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
