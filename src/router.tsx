import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { ConvexProvider } from "convex/react";
import { env } from "./env";
import { routeTree } from "./routeTree.gen";

// GET ROUTER ------------------------------------------------------------------------------------------------------------------------------
export const getRouter = () => {
  const convexQueryClient = new ConvexQueryClient(env.VITE_CONVEX_URL);

  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
      },
    },
  });
  convexQueryClient.connect(queryClient);

  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    Wrap: (props: { children: React.ReactNode }) => (
      <ConvexProvider client={convexQueryClient.convexClient}>{props.children}</ConvexProvider>
    ),
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
};
