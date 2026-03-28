import { MDXProvider } from "@mdx-js/react";
import { Route, Routes } from "react-router";
import { Navbar } from "@/components/layout/navbar";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { NotFound } from "@/components/not-found";
import BlogPostPage from "@/pages/BlogPostPage";
import CertificadosPage from "@/pages/certificados/certificados";
import HomePage from "@/pages/HomePage";
import TodosProyectosPage from "@/pages/todos-proyectos/todos-proyectos";

export default function App() {
	return (
		<MDXProvider components={mdxComponents}>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/certificados" element={<CertificadosPage />} />
				<Route path="/proyectos" element={<TodosProyectosPage />} />
				<Route path="/blog/:slug" element={<BlogPostPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</MDXProvider>
	);
}
