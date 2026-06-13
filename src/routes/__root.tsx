import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import assetMap from "@/data/asset-map.json";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { reportLovableError } from "../lib/lovable-error-reporting";

const A = assetMap as Record<string, string>;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Brand System · Men's Wellness Centers" },
      {
        name: "description",
        content:
          "Men's Wellness Centers brand system: logo, color, typography, voice, applications, and downloadable assets.",
      },
      { name: "author", content: "Men's Wellness Centers" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Brand System · Men's Wellness Centers" },
      {
        property: "og:description",
        content:
          "Men's Wellness Centers brand system: logo, color, typography, voice, applications, and downloadable assets.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Brand System · Men's Wellness Centers" },
      { name: "description", content: "Rebuild & Refine is a web application for creating and iterating on digital assets like business cards and email signatures." },
      { property: "og:description", content: "Rebuild & Refine is a web application for creating and iterating on digital assets like business cards and email signatures." },
      { name: "twitter:description", content: "Rebuild & Refine is a web application for creating and iterating on digital assets like business cards and email signatures." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/94fdba8f-0136-408d-9596-035fb67e44e7/id-preview-f6a35dbb--e34db6b0-0bf1-4c65-882f-eaad75911473.lovable.app-1781308339152.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/94fdba8f-0136-408d-9596-035fb67e44e7/id-preview-f6a35dbb--e34db6b0-0bf1-4c65-882f-eaad75911473.lovable.app-1781308339152.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", sizes: "32x32", href: A["assets/favicon/favicon-32.png"] },
      { rel: "icon", type: "image/png", sizes: "192x192", href: A["assets/favicon/favicon-192.png"] },
      { rel: "apple-touch-icon", href: A["assets/favicon/apple-touch-icon.png"] },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Montserrat:wght@400;500;600;700&family=Inter:wght@400&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Men's Wellness Centers",
          alternateName: "MWC",
          url: "https://menswellnesscenters.com",
          slogan: "Find Your Edge Over Age.",
          address: {
            "@type": "PostalAddress",
            addressRegion: "VA",
            addressCountry: "US",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </QueryClientProvider>
  );
}
