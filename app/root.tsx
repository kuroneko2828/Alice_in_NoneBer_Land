import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import "~/styles/alice.css";

import { ProgressTrap } from "~/components/ProgressTrap";
import { assetUrl } from "~/lib/assetUrl";
import {
  getOgImageUrl,
  getSiteUrl,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "~/lib/siteMeta";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&display=swap",
  },
  { rel: "icon", href: `${import.meta.env.BASE_URL}favicon.ico` },
  {
    rel: "preload",
    as: "image",
    href: assetUrl("images/play_me.png"),
    fetchpriority: "high",
  },
];

const siteUrl = getSiteUrl();
const ogImageUrl = getOgImageUrl();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_TITLE} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={ogImageUrl} />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-[#fcfcff] text-gray-500 antialiased">
        <ProgressTrap />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

/** SPA の初回 HTML 生成用（GitHub Pages など静的ホスト） */
export function HydrateFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center text-gray-500">
      <p className="text-lg">読み込み中…</p>
    </div>
  );
}
