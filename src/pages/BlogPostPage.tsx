import { useQuery } from "@tanstack/react-query";
import type { ComponentType } from "react";
import { Suspense } from "react";
import { useParams } from "react-router";
import { NotFound } from "@/components/not-found";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllPostsMeta, type PostMeta } from "@/lib/posts";
import Footer from "@/sections/footer/footer";
import { Background } from "@/sections/hero/_components/background";

const postModules = import.meta.glob<{ default: ComponentType }>(
	"../../content/posts/*.mdx",
);

const getBlogPost = async (slug: string) => {
	const importer = postModules[`../../content/posts/${slug}.mdx`];
	if (!importer) {
		throw new Error(`Post with slug "${slug}" not found`);
	}
	const module = await importer();
	return module.default;
};

export default function BlogPostPage() {
	const { slug } = useParams();

	const { data: posts = [], isLoading: loadingPosts } = useQuery({
		queryKey: ["posts"],
		queryFn: getAllPostsMeta,
	});

	const meta = posts.find((p: PostMeta) => p.slug === slug);

	if (loadingPosts) {
		return <BlogPostSkeleton />;
	}

	if (!slug || !meta) {
		return <NotFound />;
	}

	const publishedDate = meta.date ? new Date(meta.date) : null;
	const formattedDate =
		publishedDate && !Number.isNaN(publishedDate.getTime())
			? new Intl.DateTimeFormat("en-US", {
					month: "long",
					day: "numeric",
					year: "numeric",
				}).format(publishedDate)
			: "";

	const tags: string[] =
		(meta.tags ?? []).filter(
			(tag: string | null | undefined): tag is string =>
				typeof tag === "string" && tag.trim().length > 0,
		) ?? [];

	return (
		<main className="flex w-full flex-col items-stretch justify-start divide-y divide-border/80">
			<article className="flex w-full flex-col text-foreground">
				<div className="relative w-full overflow-hidden border-b border-border/80">
					<div className="h-[55vh] md:h-[50vh] w-full pointer-events-none">
						<Background />
					</div>
					<div className="absolute bottom-4 left-4 right-4 flex flex-col gap-4 md:bottom-8 md:left-8 md:right-8">
						<header className="flex flex-col gap-4 px-4 py-8 md:px-8">
							{formattedDate ? (
								<span className="text-xs font-medium text-foreground/45">
									{formattedDate}
								</span>
							) : null}
							<h1 className="text-3xl font-medium text-balance text-foreground">
								{meta.title}
							</h1>
							{meta.excerpt ? (
								<p className="text-base md:text-lg leading-relaxed text-foreground/70 text-balance">
									{meta.excerpt}
								</p>
							) : null}
							<div className="flex flex-wrap items-center text-sm text-foreground/70">
								{meta.readingTime}
							</div>
							{tags.length ? (
								<div className="flex flex-wrap gap-2">
									{tags.map((tag: string) => (
										<Badge
											key={tag}
											variant="secondary"
											size="sm"
											className="bg-card hover:bg-card"
										>
											{tag}
										</Badge>
									))}
								</div>
							) : null}
						</header>
					</div>
				</div>

				<section className="flex w-full flex-col px-4 py-8 md:p-8 border-b border-border/80 border-dashed">
					<div className="min-h-[200px]">
						<Suspense fallback={<ArticleSkeleton />}>
							<PostContent slug={slug} />
						</Suspense>
					</div>
				</section>
				<Footer />
			</article>
		</main>
	);
}

function PostContent({ slug }: { slug: string }) {
	const { data: Post } = useQuery({
		queryKey: ["blog-post", slug],
		queryFn: () => getBlogPost(slug),
		staleTime: 1000 * 60 * 5,
	});
	if (!Post) return null;
	return <Post />;
}

const tagSkeletonKeys = ["tag-1", "tag-2", "tag-3", "tag-4"];
const paragraphSkeletonKeys = ["para-1", "para-2", "para-3", "para-4"];

function ArticleSkeleton() {
	return (
		<div className="space-y-8 mt-12">
			<div className="space-y-8">
				<Skeleton
					variant="shimmer"
					shape="text"
					size="lg"
					lines={1}
					className="max-w-3xl"
				/>
				<Skeleton
					variant="shimmer"
					shape="text"
					size="lg"
					lines={3}
					className="max-w-2xl"
				/>
				<div className="flex flex-wrap gap-3">
					{tagSkeletonKeys.map((key) => (
						<Skeleton
							key={key}
							variant="shimmer"
							shape="rectangle"
							size="sm"
							className="h-6 w-20 rounded-full"
						/>
					))}
				</div>
			</div>
			<div className="space-y-6">
				{paragraphSkeletonKeys.map((key) => (
					<Skeleton
						key={key}
						variant="shimmer"
						shape="text"
						size="md"
						lines={5}
						className="space-y-2"
					/>
				))}
			</div>
		</div>
	);
}

function BlogPostSkeleton() {
	return (
		<main className="flex w-full flex-col items-stretch justify-start divide-y divide-border/80">
			<div className="relative w-full overflow-hidden border-b border-border/80">
				<div className="h-[55vh] md:h-[50vh] w-full pointer-events-none">
					<Background />
				</div>
			</div>
			<section className="flex w-full flex-col px-4 py-8 md:p-8 border-b border-border/80 border-dashed">
				<ArticleSkeleton />
			</section>
		</main>
	);
}
