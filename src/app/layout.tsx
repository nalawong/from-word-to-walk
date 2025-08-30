import "./globals.css";
import { ReactNode } from "react";
import { ThemeScript } from "../lib/utils";

export const metadata = {
  title: "From Word to Walk",
  description: "Bible reading plan: Luke to James — one chapter a day.",
  manifest: "/manifest.webmanifest",
  themeColor: "#0ea5e9",
  appleMobileWebAppCapable: "yes",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/icons/icon-192.svg" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {ThemeScript}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js').catch(() => {});
              });
            }
          `,
          }}
        />
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}