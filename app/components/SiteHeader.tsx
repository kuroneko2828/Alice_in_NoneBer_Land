import { Link } from "@remix-run/react";

export function SiteHeader() {
  return (
    <header id="header">
      <div className="content">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          Alice in NoneBer Land
        </Link>
      </div>
    </header>
  );
}
