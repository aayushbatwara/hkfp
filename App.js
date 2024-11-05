import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigation from "./src/navigation";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
      <AppNavigation />

      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
