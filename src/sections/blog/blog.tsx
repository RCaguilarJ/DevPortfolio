import { ReaderIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import BlogCard from "@/sections/blog/_components/blog-card";
import type { PostMeta } from "@/sections/blog/_server/posts";

type BlogSectionProps = {
	posts: PostMeta[];
};

export default function Blog({ posts }: BlogSectionProps) {
	const hasPosts = posts && posts.length > 0;

	return (
		<Section
			id="blog"
			title="Comparte tus ideas mas recientes"
			description="Usa esta seccion para adelantar publicaciones recientes, bitacoras publicas o analisis largos del trabajo del que mas te enorgulleces."
			className="grid grid-cols-1 gap-4 md:grid-cols-2"
			badgeText="Ultimas publicaciones"
			badgeIcon={<ReaderIcon aria-hidden="true" className="size-3.5" />}
		>
			{hasPosts ? (
				posts.map((post) => <BlogCard key={post.slug} meta={post} />)
			) : (
				<p className="text-sm text-foreground/60">
					Aun no hay publicaciones - agrega un archivo MDX en{" "}
					<code>src/content/posts</code> para llenar esta rejilla.
				</p>
			)}
		</Section>
	);
}
