import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getBreadStuff } from "@/server/ingredients";

export default async function ServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["breadStuff"],
    queryFn: () => {
      console.log("server yay");
      return getBreadStuff();
    },
    staleTime: 1000 * 60 * 60,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
