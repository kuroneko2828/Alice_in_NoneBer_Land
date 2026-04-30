import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { StoryShell } from "~/components/StoryShell";

export const meta: MetaFunction = () => [
  { title: "架空数" },
  { name: "description", content: "解読x数字がテーマのWeb謎" },
];

export default function StoryLewis() {
  return (
    <StoryShell>
      <div className="story">
        <div className="story-title">？？？</div>
        <div className="story-content">
          <p>「これは違うな。また最初から書き直しだ」</p>
        </div>
      </div>
      <div className="next text-center">
        <Link to="/" className="btn btn-outline-info submit-btn inline-block">
          書き直す
        </Link>
      </div>
    </StoryShell>
  );
}
