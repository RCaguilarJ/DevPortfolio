import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "@/App";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/toast";
import { LenisProvider } from "@/lib/lenis-context";
import "@/styles.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
		},
	},
});

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element #root was not found");
}

createRoot(rootElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ThemeProvider>
					<LenisProvider>
						<App />
						<Toaster />
					</LenisProvider>
				</ThemeProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>,
);
