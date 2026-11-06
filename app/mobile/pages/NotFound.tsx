import { Link } from "react-router-dom";
import { useTitle } from "../../hooks";
import { PageEnd, PageHeader } from "../ui";

export default function NotFound() {
  useTitle("404 — Ishak Sacirbey");
  return (
    <main>
      <PageHeader>
        <div className="m-v16">
          <span className="m-label">Error 404</span>
          <h1 className="m-h1">
            File not <em>found.</em>
          </h1>
          <p className="m-lede">This page doesn't exist — or it's still sitting in the playground, unfinished.</p>
          <Link to="/" className="m-btn m-btn-primary">
            Back home
          </Link>
        </div>
      </PageHeader>
      <PageEnd aside="lost? happens to the best of us." secondary={{ label: "See the work", to: "/work" }} />
    </main>
  );
}
