import { MDXProvider } from "@mdx-js/react";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { Navbar } from "@/components/layout/navbar";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { NotFound } from "@/components/not-found";

const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const CertificadosPage = lazy(
	() => import("@/pages/certificados/certificados"),
);
const HomePage = lazy(() => import("@/pages/HomePage"));
const TodosProyectosPage = lazy(
	() => import("@/pages/todos-proyectos/todos-proyectos"),
);

export default function App() {
	return (
		<MDXProvider components={mdxComponents}>
			<Navbar />
			<Suspense fallback={<RouteFallback />}>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/certificados" element={<CertificadosPage />} />
					<Route path="/proyectos" element={<TodosProyectosPage />} />
					<Route path="/blog/:slug" element={<BlogPostPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</MDXProvider>
	);
}

function RouteFallback() {
	return (
		<main
			className="flex min-h-screen w-full flex-col bg-background"
			aria-busy="true"
		/>
	);
}
