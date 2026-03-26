import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { PostMeta } from "@/lib/posts";
import { blogPostQueryOptions } from "@/sections/blog/_queries/posts";

type BlogCardProps = {
	meta: PostMeta;
};

export default function BlogCard({ meta }: BlogCardProps) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const hasPrefetchedRef = useRef(false);
	const prefetchBlogRoute = useCallback(() => {
		if (hasPrefetchedRef.current) return;
		hasPrefetchedRef.current = true;
		queryClient.prefetchQuery(blogPostQueryOptions(meta.slug));
	}, [meta.slug, queryClient]);

	const formattedDate = formatDate(meta.date);
	const formattedReadingTime = formatReadingTime(meta.readingTime);
	const tags =
		(meta.tags ?? []).filter(
			(tag: string | null | undefined): tag is string =>
				typeof tag === "string" && tag.trim().length > 0,
		) ?? [];

	return (
		<Link
			to={`/blog/${meta.slug}`}
			className="block h-full rounded-lg transition-shadow duration-100 ease-out-quad focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none"
			aria-label={`Leer articulo: ${meta.title}`}
			onMouseEnter={prefetchBlogRoute}
			onFocus={prefetchBlogRoute}
		>
			<Card className="flex h-full flex-col justify-between gap-4">
				<CardHeader className="space-y-2">
					<div className="flex items-center justify-between text-xs text-foreground/45">
						<span>{formattedDate}</span>
						<span>{formattedReadingTime}</span>
					</div>
					<CardTitle className="text-balance leading-normal">
						{meta.title}
					</CardTitle>
					{meta.excerpt ? (
						<CardDescription>{meta.excerpt}</CardDescription>
					) : null}
				</CardHeader>
				{tags.length ? (
					<CardContent className="pt-0">
						<div className="flex flex-wrap gap-2">
							{tags.map((tag) => (
								<Badge
									key={tag}
									variant="secondary"
									size="sm"
									className="bg-card-elevated hover:bg-card-elevated"
								>
									{tag}
								</Badge>
							))}
						</div>
					</CardContent>
				) : null}
			</Card>
		</Link>
	);
}

function formatDate(date: string) {
	if (!date) return "";
	const parsed = new Date(date);
	if (Number.isNaN(parsed.getTime())) return "";
	return new Intl.DateTimeFormat("es-ES", {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(parsed);
}

function formatReadingTime(readingTime: string) {
	if (!readingTime) return "";
	return readingTime
		.replace("less than", "menos de")
		.replace("mins read", "min de lectura")
		.replace("min read", "min de lectura");
}
