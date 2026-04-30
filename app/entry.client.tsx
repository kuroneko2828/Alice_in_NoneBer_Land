/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  });
}

/**
 * SPA は初回 HTML がフォールバックのため、インラインスクリプト後のレイアウトを1フレーム挟むと
 * 画像の初回描画が安定することがある。
 */
requestAnimationFrame(() => {
  hydrate();
});
