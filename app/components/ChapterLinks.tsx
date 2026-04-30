import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { getProgress } from "~/lib/progress";

export function ChapterLinks() {
  const [p, setP] = useState(0);

  useEffect(() => {
    setP(getProgress());
  }, []);

  return (
    <ul className="chapter">
      <li id="chapter1" style={{ display: p >= 1 ? "inline-block" : "none" }}>
        <Link to="/story/tea-party-end">パズル1 クリア</Link>
      </li>
      <li id="chapter2" style={{ display: p >= 2 ? "inline-block" : "none" }}>
        <Link to="/story/escape-forest">パズル2 クリア</Link>
      </li>
      <li id="chapter3" style={{ display: p >= 3 ? "inline-block" : "none" }}>
        <Link to="/story/choice">パズル3 クリア</Link>
      </li>
    </ul>
  );
}
