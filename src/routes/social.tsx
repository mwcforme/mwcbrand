import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
} from "@tanstack/react-router";

export const Route = createFileRoute("/social")({
  component: () => <Outlet />,
  notFoundComponent: () => (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>Platform not found</h1>
        <p>
          We don't have a brand page for that channel yet.{" "}
          <Link to="/social">See all platforms</Link>.
        </p>
      </div>
    </section>
  ),
  errorComponent: ({ error, reset }) => (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">Error</p>
        <h1>Something broke loading this channel</h1>
        <p>{error.message}</p>
        <button type="button" className="btn btn-primary" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </section>
  ),
});

// Keep referenced so import order stays explicit in some bundlers.
void notFound;
